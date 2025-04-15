package com.teca.core.inherit;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import com.teca.core.model.response.OneResponse;
import com.teca.core.querybuilder.QueryBuilder2;
import com.teca.core.service.QueryBuilder2Service;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.teca.application.common.model.PageableQuery;
import com.teca.application.common.model.PaginatedDTO;
import com.teca.application.common.model.PaginatedMeta;
import com.teca.core.model.dto.MetaDTO;
import com.teca.core.model.request.ListRequest;
import com.teca.core.model.response.ListResponse;

@Slf4j
public abstract class AbstractQuery {
    @Autowired
    @Qualifier("skipNull")
    protected ModelMapper skipNullMapper;

    @Autowired
    @Qualifier("nonSkipNull")
    protected ModelMapper nonSkipNullMapper;

    @Autowired
    protected QueryBuilder2Service queryBuilderService;

    protected <T> PaginatedDTO<T> getPaging(PageableQuery request, QueryBuilder2 queryBuilder,
            Class<T> dtoClazz) {
        return getPagingRender(request, queryBuilder, dtoClazz, queryBuilderService);
    }

    // protected PaginatedDTO getList(QueryBuilder2 queryBuilder,
    // Class<?> dtoClazz) {
    // var result = new PaginatedDTO();
    // var items = queryBuilderService.getResults(queryBuilder.build(),
    // queryBuilder.getParams(), HashMap.class);

    // var resultSql = items.stream().map(item -> nonSkipNullMapper.map(item,
    // dtoClazz)).collect(Collectors.toList());
    // result.setItems(resultSql);
    // return result;
    // }

    // protected ResponseListDto<T> getList<T>(QueryBuilder queryBuilder) {
    // var result = new ResponseListDto<T>();
    // var items = queryBuilderService.getResults(queryBuilder.build(),
    // queryBuilder.getParams(), HashMap.class);
    //
    // var resultSql = items.stream().map(item -> nonSkipNullMapper.map(item,
    // result.Class)).collect(Collectors.toList());
    // result.setItems(resultSql);
    // return result;
    // }

    // protected OneResponse getOne(QueryBuilder2 queryBuilder,
    // Class<?> dtoClazz) {
    // var result = new OneResponse();
    // // var query = queryBuilder.getQueryStatement();
    // var items = queryBuilderService.getResults(queryBuilder.build(),
    // queryBuilder.getParams(), HashMap.class);

    // var resultSql = items.stream().map(item -> nonSkipNullMapper.map(item,
    // dtoClazz)).collect(Collectors.toList());
    // result.setItem(resultSql.size() > 0 ? resultSql.get(0) : null);
    // return result;
    // }

    protected <T> T getResult(QueryBuilder2 queryBuilder, Class<T> dtoClazz) {

        var items = queryBuilderService.getResults(queryBuilder.build(), queryBuilder.getParams(), HashMap.class);

        return items.stream()
                .map(item -> nonSkipNullMapper.map(item, dtoClazz))
                .findFirst()
                .orElse(null);

    }

    protected <T> List<T> getResults(QueryBuilder2 queryBuilder, Class<T> dtoClazz) {

        var items = queryBuilderService.getResults(queryBuilder.build(), queryBuilder.getParams(), HashMap.class);

        return items.stream()
                .map(item -> nonSkipNullMapper.map(item, dtoClazz))
                .collect(Collectors.toList());
    }

    private <T> PaginatedDTO<T> getPagingRender(
            PageableQuery request,
            QueryBuilder2 queryBuilder,
            Class<T> dtoClazz, QueryBuilder2Service queryBuilderService) {

        var response = new PaginatedDTO<T>();

        var page = request.getPage();
        var size = request.getSize();

        if (page == null)
            page = 1;
        if (size == null || size > 200)
            size = 200;

        var countable = request.getCountable();
        if (countable == null)
            countable = true;

        var meta = new PaginatedMeta();

        meta.setPage(request.getPage());
        meta.setSize(request.getSize());
        meta.setHasNextPage(false);

        response.setMeta(meta);

        if (countable) {
            queryBuilder.paging((page - 1) * size, size);
            var query = queryBuilder.getQueryStatement().replaceAll(" FROM ", " from ");
            queryBuilder.query(new StringBuffer(query)
                    .insert(query.indexOf(" from "), ", count(*) over () as total").toString());
        } else {
            queryBuilder.paging((page - 1) * size, size + 1);
        }

        var items = queryBuilderService.getResults(queryBuilder.build(), queryBuilder.getParams(), HashMap.class);

        if (response.getMeta() != null) {
            if (countable != null && countable) {
                response.getMeta().setTotal(items.isEmpty() ? 0 : ((BigDecimal) items.get(0).get("total")).longValue());
            } else if (size != null && items.size() > size) {
                response.getMeta().setHasNextPage(true);
                items.remove(items.size() - 1);
            }
        }

        response.setItems(
                items.stream().map(item -> nonSkipNullMapper.map(item, dtoClazz))
                        .collect(Collectors.toList()));
        return response;
    }

    protected QueryBuilder2 createQueryBuilder(String query) {
        var queryBuilder = new QueryBuilder2();

        queryBuilder.query(query);

        return queryBuilder;
    }

}
