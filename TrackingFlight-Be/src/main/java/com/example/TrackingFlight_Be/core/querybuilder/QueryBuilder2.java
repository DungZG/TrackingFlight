package com.teca.core.querybuilder;

import com.teca.core.utility.StringUtil;
import lombok.Getter;

import java.util.*;
import java.util.regex.Pattern;

public class QueryBuilder2 {

    @Getter
    private String queryStatement;

    private final List<String> filters = new ArrayList<>();

    @Getter
    private final Map<String, Object> params = new HashMap<>();

    private String pagingStatement;

    private String arrangement;

    public QueryBuilder2() {
    }

    public QueryBuilder2(String query) {
        this.queryStatement = StringUtil.removeExtraSpaces(query);
    }

    public void query(final String query) {

        this.queryStatement = StringUtil.removeExtraSpaces(query);
    }

    public void filter(final String query, final Object... values) {

        this.filters.add(query.trim());

        if (values.length > 0) {

            var valueIterator = Arrays.stream(values).iterator();

            var pattern = Pattern.compile("(?<=:)(.*?)(?= |,|\\)|$)");

            var matcher = pattern.matcher(query);

            while (matcher.find()) {
                var param = matcher.group();

                if (!this.params.containsKey(param)) {
                    this.params.put(param, valueIterator.next());
                }
            }
        }
    }

    public void sort(final String field) {

        if (this.arrangement == null) {
            this.arrangement = " order by ";
        } else {
            this.arrangement += ", ";
        }

        this.arrangement += field;
    }

    public void reverse(final String field) {

        if (this.arrangement == null) {
            this.arrangement = " order by ";
        } else {
            this.arrangement += ", ";
        }

        this.arrangement += field + " desc";
    }

    public void paging(final Integer offset, final Integer limit) {
        this.pagingStatement = " offset " + offset + " rows fetch next " + limit + " rows only";
    }

    public String build() {

        var queryBuilder = new StringBuilder(this.queryStatement);

        StringBuilder queryWhere = new StringBuilder();
        String andPath = "";

        if (!filters.isEmpty()) {
            queryWhere.append(" where ");
        }
        for (var filter : filters) {
            queryWhere.append(andPath).append(filter.trim()).append(" ");
            andPath = " and ";
        }

        int indexWhere = queryBuilder.indexOf("[where]");
        if (indexWhere != -1) {
            queryBuilder = new StringBuilder(queryBuilder.toString().replace("[where]", queryWhere.toString()));
        } else {
            queryBuilder.append(queryWhere);
        }

        if (this.arrangement != null)
            queryBuilder.append(this.arrangement);

        if (this.pagingStatement != null)
            queryBuilder.append(this.pagingStatement);

        return queryBuilder.toString();
    }

}
