package com.teca.core.service;

import com.teca.core.constant.Constants;
import com.teca.core.utility.StringUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Tuple;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class QueryBuilder2Service {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private ModelMapper mapper;

    public void update(String str) {
        var query = entityManager.createNativeQuery(StringUtil.removeExtraSpaces(str));

        entityManager.joinTransaction();

        query.executeUpdate();
    }

    public void update(String str, Map<String, Object> params) {
        var query = entityManager.createNativeQuery(StringUtil.removeExtraSpaces(str));

        params.forEach(query::setParameter);

        entityManager.joinTransaction();

        query.executeUpdate();
    }

    public <T> T getResult(String str, Class<T> destinationClass) {

        var results = getResults(str, destinationClass);

        return results.isEmpty() ? null : results.get(0);
    }

    public <T> T getResult(String str, Map<String, Object> params, Class<T> destinationClass) {

        var results = getResults(str, params, destinationClass);

        return results.isEmpty() ? null : results.get(0);
    }

    public <T> List<T> getResults(String str, Class<T> destinationClass) {

        var query = entityManager.createNativeQuery(StringUtil.removeExtraSpaces(str), Tuple.class);

        return mapToObjectListFromTupleList(query.getResultList(), destinationClass);
    }

    public <T> List<T> getResults(String str, Map<String, Object> params, Class<T> destinationClass) {

        var query = entityManager.createNativeQuery(StringUtil.removeExtraSpaces(str), Tuple.class);

        params.forEach(query::setParameter);

        return mapToObjectListFromTupleList(query.getResultList(), destinationClass);
    }

    private <T> List<T> mapToObjectListFromTupleList(List<Tuple> source, Class<T> destinationClass) {

        return source.stream().map(e -> mapToObjectFromTuple(e, destinationClass)).collect(Collectors.toList());
    }

    private <T> T mapToObjectFromTuple(Tuple source, Class<T> destinationClass) {

        if (Constants.JAVA_DATA_TYPES.contains(destinationClass)) {
            return mapper.map(source.get(0), destinationClass);
        }

        var fields = new HashMap<>();

        source.getElements().forEach(
                e -> fields.put(StringUtil.snakeToCamelCase(e.getAlias().toLowerCase()), source.get(e.getAlias())));

        return mapper.map(fields, destinationClass);
    }
}
