package com.teca.application.common.utilities;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.teca.application.common.model.ListItemDTO;
import com.teca.application.common.model.PageableQuery;
import com.teca.application.common.model.PaginatedDTO;
import com.teca.application.common.model.PaginatedMeta;
import com.teca.domain.common.BaseEntity;

public class MapperUtil {

    private MapperUtil() {
    }

    public static <T> PaginatedMeta pageToMeta(Page<T> page) {
        return new PaginatedMeta(page.getNumber() + 1, page.getSize(), page.getTotalElements());
    }

    @SafeVarargs
    @SuppressWarnings("varargs")
    public static <S, D> List<D> asList(Function<? super S, ? extends D> mapper, S... items) {
        return toList(Arrays.asList(items), mapper);
    }

    public static <S, D> List<D> toList(Collection<S> items, Function<? super S, ? extends D> mapper) {
        return items.stream().map(mapper).collect(Collectors.toList());
    }

    public static <S extends BaseEntity> List<String> toListId(Collection<S> items) {
        return items.stream().map(e -> e.getId()).collect(Collectors.toList());
    }

    public static <S, D> Set<D> toSet(Collection<S> items, Function<? super S, ? extends D> mapper) {
        return items.stream().map(mapper).collect(Collectors.toSet());
    }

    public static <S> Set<S> toSet(Collection<S> items) {
        return items.stream().collect(Collectors.toSet());
    }

    public static <S, D, R extends ListItemDTO<D>> R toListItem(R result, Collection<S> items,
            Function<? super S, ? extends D> mapper) {
        result.setItems(MapperUtil.toList(items, mapper));
        return result;
    }

    public static <S, D, R extends PaginatedDTO<D>> R toPaginated(R result, Page<S> page,
            Function<? super S, ? extends D> mapper) {
        MapperUtil.toListItem(result, page.getContent(), mapper);
        result.setMeta(MapperUtil.pageToMeta(page));
        return result;
    }

    public static <S, D, R extends PaginatedDTO<D>> R toPaginated(R result, PaginatedDTO<S> page,
            Function<? super S, ? extends D> mapper) {
        MapperUtil.toListItem(result, page.getItems(), mapper);
        result.setMeta(page.getMeta());
        return result;
    }

    public static Pageable queryToPageable(PageableQuery query) {
        return PageRequest.of(query.getPage() - 1, query.getSize());
    }

    public static <T> List<T> setToList(Set<T> set) {
        return set.stream().collect(Collectors.toList());
    }

}
