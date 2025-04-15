package com.teca.application.common.model;

import java.util.Arrays;
import java.util.List;

import com.teca.application.common.utilities.CriteriaBuilderUtil;
import com.teca.application.common.utilities.StringUtil;
import com.teca.application.common.enums.OrderDirection;
import com.teca.application.common.exceptions.BadRequestException;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageableQuery {

    private Integer page = 1;

    public void setPage(Integer value) {
        page = value;
        if (value < 0)
            page = 1;
    }

    private Integer size = 10;

    public void setSize(Integer value) {
        size = value;
        if (value < 0 || value > 100)
            size = 100;
    }

    public void setSizeOverride(Integer value) {
        size = value;
    }

    public Integer skip() {
        return (page - 1) * size;
    }

    private String orderBy = "createdAt-desc";

    private String q;

    private String values;

    private Boolean countable;

    public List<String> values() throws BadRequestException {
        var items = StringUtil.slitToList(values);
        if (items.size() > 100)
            throw new BadRequestException("Danh sách giá trị tối đa 100");
        return items;
    }

    public List<CriteriaOrder> ordersBy() throws BadRequestException {
        var items = StringUtil.slitToList(getOrderBy());
        if (items.size() > 10) {
            throw new BadRequestException("Danh sách giá trị tối đa 10");
        }
        var orders = CriteriaBuilderUtil.newCriteriaOrders();
        for (var item : items) {
            var data = item.split("-");
            if (data.length != 2) {
                throw new BadRequestException("Không đúng định dạng order");
            }
            if (!allowKeys().contains(data[0])) {
                throw new BadRequestException("Thuộc tích order không hợp lệ");
            }
            orders.add(new CriteriaOrder(mapOrderKey(data[0]), OrderDirection.fromValue(data[1])));
        }
        return orders;
    }

    public String mapOrderKey(String key) {
        return key;
    }

    public List<String> allowKeys() {
        return Arrays.asList("createdAt");
    }

}
