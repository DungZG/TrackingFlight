package com.teca.application.common.utilities;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.teca.application.common.enums.CriteriaOperator;
import com.teca.application.common.enums.OrderDirection;
import com.teca.application.common.model.CriteriaFilter;
import com.teca.application.common.model.CriteriaOrder;

import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class CriteriaBuilderUtil {
    private CriteriaBuilderUtil() {
    }

    public static <T> List<Predicate> buildPredicates(CriteriaBuilder cb, Root<T> root, List<CriteriaFilter> filters) {
        List<Predicate> predicates = new ArrayList<>();
        for (CriteriaFilter filter : filters) {
            var value = filter.getValue();
            if (filter.getOperator().equals(CriteriaOperator.EQUAL)) {
                predicates.add(cb.equal(root.get(filter.getKey()), value));
            } else if (filter.getOperator().equals(CriteriaOperator.NOT)) {
                predicates.add(cb.notEqual(root.get(filter.getKey()), value));
            } else if (filter.getOperator().equals(CriteriaOperator.IN)) {
                var values = (List<String>) filter.getValue();
                predicates.add(root.get(filter.getKey()).in(values));
            } else if (filter.getOperator().equals(CriteriaOperator.LIKE)) {
                predicates.add(cb.like(root.get(filter.getKey()), "%" + value + "%"));
            } else if (filter.getOperator().equals(CriteriaOperator.CONTAINS)) {
                predicates.add(cb.like(cb.lower(root.get(filter.getKey())), "%" + value + "%"));
            } else if (filter.getOperator().equals(CriteriaOperator.STARTS_WITH)) {
                predicates.add(cb.like(root.get(filter.getKey()), value + "%"));
            } else if (filter.getOperator().equals(CriteriaOperator.ENDS_WITH)) {
                predicates.add(cb.like(root.get(filter.getKey()), "%" + value));
            } else if (filter.getOperator().equals(CriteriaOperator.GREATER_THAN)) {
                predicates.add(cb.greaterThan(root.get(filter.getKey()), (Comparable) value));
            } else if (filter.getOperator().equals(CriteriaOperator.LESS_THAN)) {
                predicates.add(cb.lessThan(root.get(filter.getKey()), (Comparable) value));
            } else if (filter.getOperator().equals(CriteriaOperator.GREATER_THAN_OR_EQUAL)) {
                predicates.add(cb.greaterThanOrEqualTo(root.get(filter.getKey()), (Comparable) value));
            } else if (filter.getOperator().equals(CriteriaOperator.LESS_THAN_OR_EQUAL)) {
                predicates.add(cb.lessThanOrEqualTo(root.get(filter.getKey()), (Comparable) value));
            } else if (filter.getOperator().equals(CriteriaOperator.IS_NULL)) {
                predicates.add(cb.isNull(root.get(filter.getKey())));
            } else if (filter.getOperator().equals(CriteriaOperator.NOT_NULL)) {
                predicates.add(cb.isNotNull(root.get(filter.getKey())));
            } else if (filter.getOperator().equals(CriteriaOperator.AND)) {
                var and = buildPredicates(cb, root, (List<CriteriaFilter>) value);
                predicates.add(cb.and(and.toArray(new Predicate[0])));
            } else if (filter.getOperator().equals(CriteriaOperator.OR)) {
                var or = buildPredicates(cb, root, (List<CriteriaFilter>) value);
                predicates.add(cb.or(or.toArray(new Predicate[0])));
            }
        }
        return predicates;
    }

    public static String buildQuery(List<CriteriaFilter> filters, Map<String, Object> params, Boolean or) {
        var query = filters.isEmpty() ? "(1=1)" : "";
        var index = 0;
        for (CriteriaFilter filter : filters) {
            var key = filter.getKey();
            var paramKey = "key_" + StringUtil.uuid();
            var value = filter.getValue();
            if (index != 0) {
                query += " " + (or ? "or" : "and") + " ";
            }
            if (filter.getOperator().equals(CriteriaOperator.EQUAL)) {
                query += key + " = :" + paramKey;
                params.put(paramKey, value);
            } else if (filter.getOperator().equals(CriteriaOperator.NOT)) {
                query += key + " != :" + paramKey;
                params.put(paramKey, value);
            } else if (filter.getOperator().equals(CriteriaOperator.IN)) {
                query += key + " in " + "(:" + paramKey + ")";
                params.put(paramKey, value);
            } else if (filter.getOperator().equals(CriteriaOperator.LIKE)) {
                query += key + " like :" + paramKey;
                params.put(paramKey, value);
            } else if (filter.getOperator().equals(CriteriaOperator.CONTAINS)) {
                query += key + " like :" + paramKey;
                params.put(paramKey, "%" + value + "%");
            } else if (filter.getOperator().equals(CriteriaOperator.STARTS_WITH)) {
                query += key + " like :" + paramKey;
                params.put(paramKey, "%" + value);
            } else if (filter.getOperator().equals(CriteriaOperator.ENDS_WITH)) {
                query += key + " like :" + paramKey;
                params.put(paramKey, value + "%");
            } else if (filter.getOperator().equals(CriteriaOperator.GREATER_THAN)) {
                query += key + " > :" + paramKey;
                params.put(paramKey, value);
            } else if (filter.getOperator().equals(CriteriaOperator.LESS_THAN)) {
                query += key + " < :" + paramKey;
                params.put(paramKey, value);
            } else if (filter.getOperator().equals(CriteriaOperator.GREATER_THAN_OR_EQUAL)) {
                query += key + " >= :" + paramKey;
                params.put(paramKey, value);
            } else if (filter.getOperator().equals(CriteriaOperator.LESS_THAN_OR_EQUAL)) {
                query += key + " <= :" + paramKey;
                params.put(paramKey, value);
            } else if (filter.getOperator().equals(CriteriaOperator.IS_NULL)) {
                query += key + " is null";
            } else if (filter.getOperator().equals(CriteriaOperator.NOT_NULL)) {
                query += key + " is not null";
            } else if (filter.getOperator().equals(CriteriaOperator.AND)) {
                query += "(" + buildQuery((List<CriteriaFilter>) value, params, false) + ")";
            } else if (filter.getOperator().equals(CriteriaOperator.OR)) {
                query += "(" + buildQuery((List<CriteriaFilter>) value, params, true) + ")";
            }
            index++;
        }
        return query;
    }

    public static <T> List<Order> buildOrders(CriteriaBuilder cb, Root<T> root, List<CriteriaOrder> orders) {
        List<Order> orderBy = new ArrayList<>();
        for (var order : orders) {
            if (order.getDirection().equals(OrderDirection.ASC)) {
                orderBy.add(cb.asc(root.get(order.getKey())));
            } else {
                orderBy.add(cb.desc(root.get(order.getKey())));
            }
        }
        return orderBy;
    }

    public static String buildOrders(List<CriteriaOrder> orders) {
        var orderBy = "";
        if (orders.isEmpty()) {
            return orderBy;
        }
        orderBy += " order by";
        var index = 0;
        for (var order : orders) {
            if (index != 0) {
                orderBy += ",";
            }
            orderBy += " " + order.getKey() + " " + order.getDirection().getValue();
            index++;
        }
        return orderBy;
    }

    public static <T> void setParameters(TypedQuery<T> query, Map<String, Object> params) {
        for (var entry : params.entrySet()) {
            query.setParameter(entry.getKey(), entry.getValue());
        }
    }

    public static void setParameters(Query query, Map<String, Object> params) {
        for (var entry : params.entrySet()) {
            query.setParameter(entry.getKey(), entry.getValue());
        }
    }

    public static CriteriaFilter orKeysContainsQ(String q, String... keys) {
        var or = MapperUtil.asList(
                key -> new CriteriaFilter(key, CriteriaOperator.CONTAINS, q.toLowerCase()),
                keys);
        return new CriteriaFilter(CriteriaOperator.OR, or);
    }

    public static CriteriaFilter orKeysContainsQ(String q, List<String> keys, List<String> keysUnsigned) {
        var or = MapperUtil.toList(
                keys,
                key -> new CriteriaFilter(key, CriteriaOperator.CONTAINS, q));
        var unsigned = MapperUtil.toList(
                keysUnsigned,
                key -> new CriteriaFilter(key, CriteriaOperator.CONTAINS, StringUtil.removeAccentLower(q)));
        or.addAll(unsigned);
        return new CriteriaFilter(CriteriaOperator.OR, or);
    }

    public static List<CriteriaFilter> newCriteriaFilters() {
        return new ArrayList<>();
    }

    public static List<CriteriaOrder> newCriteriaOrders() {
        return new ArrayList<>();
    }

    public static List<CriteriaOrder> orderByCreatedAtDesc() {
        var orders = newCriteriaOrders();
        orders.add(new CriteriaOrder("createdAt"));
        return orders;
    }

    public static CriteriaFilter newFilterIdInValues(List<String> values) {
        return new CriteriaFilter("id", CriteriaOperator.IN, values);
    }

    public static CriteriaFilter newCriteriaFilter(String key, Object value) {
        return new CriteriaFilter(key, value);
    }

    public static Map<String, Object> newParams() {
        return new HashMap<>();
    }
}
