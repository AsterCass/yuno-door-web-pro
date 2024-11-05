import {ComplexTableColumnIconSiteEnum, ComplexTableColumnTypeEnum} from "@/constant/enums/component-enums";

/**
 * [官方]
 * name：当前列code，唯一id同表不重复。用于指定表的主键id、指定自定义槽等功能
 * required（可选）：使用visible-columns属性后，该列仍然显示
 * label：实际显示在用户界面该行的文字
 * align（可选，默认 'right' ）：当前列框中数据的校准位置
 * field：绑定数据字段，一般和name相同
 *
 * [自定义]
 * sortableLite：（可选，默认false）是否支持排序（重写官方逻辑）
 * cardShowLabel（可选，默认true）：卡片方式显示时，是否展示该列label
 * cardSite（可选，默认 'content' ）：卡片方式显示时，该字段在卡片的位置，
 *      可选项：content, title, subscript, footerRight, footerLeft, footerMiddle
 * type（可选，默认 'default'）：该列渲染方式，
 *      可选项：default, point, iconWithColor, image
 * iconSite（可选项，默认 'start'）：type=iconWithColor有效，可选项：start, end
 * imageSize（可选项，默认无限制）
 */
const mockTableBaseInfoOrderCol = [
    {
        name: 'projectHouseOrderId',
        field: 'projectHouseOrderId',
        label: '订单编号',
        align: 'center',
    },
    {
        name: 'projectId',
        field: 'projectId',
        label: '活动编号',
        align: 'center',
        sortableLite: true,
        type: ComplexTableColumnTypeEnum.POINT,
    },
    {
        name: 'projectName',
        field: 'projectName',
        label: '活动名称',
        align: 'center',
    },
    {
        name: 'houseAddress',
        field: 'houseAddress',
        label: '房源信息',
        align: 'center',
    },
    {
        name: 'bookUserName',
        field: 'bookUserName',
        label: '姓名',
        align: 'center',
        type: ComplexTableColumnTypeEnum.POINT,
    },
    {
        name: 'bookUserPhone',
        field: 'bookUserPhone',
        label: '手机号',
        align: 'center',
    },
    {
        name: 'userStatusName',
        field: 'userStatusName',
        label: '用户状态',
        align: 'center',
        type: ComplexTableColumnTypeEnum.ICON_COLOR,
    },
    {
        name: 'orderStatusName',
        field: 'orderStatusName',
        label: '订单状态',
        align: 'center',
        type: ComplexTableColumnTypeEnum.ICON_COLOR,
    },
    {
        name: 'houseImage',
        field: 'houseImage',
        label: '房源照片',
        align: 'center',
        type: ComplexTableColumnTypeEnum.IMAGE,
        imageSize: '4rem'
    },
    {
        name: 'createTime',
        field: 'createTime',
        label: '创建时间',
        sortableLite: true,
        align: 'center',
    },
    {
        name: 'operation',
        field: 'operation',
        label: '操作',
        align: 'center',
    },
]

/**
 * [官方]
 * tableColumns：列配置
 * tableKey：表单唯一键
 * selectType：行选择类型，可选项：none, single, multiple
 */
export const mockTableBaseInfoOrder = {
    tableColumns: mockTableBaseInfoOrderCol,
    tableKey: "projectHouseOrderId",
    selectType: 'multiple',
}

/**
 * 当 tableColumns 包含 operation 属性生效
 * [自定义]
 * label：展示在操作列的操作文字内容
 * condition：出现条件，比如出现条件为 'cod', 那么只有在该行数据 thisData.cod 判断为 true 的时候才会显示
 * name：在用户点击时候，会将该字段值传回，用于确定哪个label被点击
 */
export const mockTableBaseInfoOrderOperation = [
    {
        label: '详情',
        condition: 'webShowDetailOp',
        name: 'detail',
    },
    {
        label: '删除',
        condition: 'webShowDeleteOp',
        name: 'delete',
    }
]

/**
 * 以下内容字段根据实际逻辑添加
 * __（可选项）：__为定义在该表customTableOperation中的condition字段决定，通过这个字段控制该行操作列的展示的可点击操作
 * __WebIconName（可选项）：tableColumns 中 name 为__ 的字段在 type=iconWithColor有效
 * __WebColorName（可选项）：tableColumns 中 name 为__ 的字段在 type=iconWithColor有效
 * __WebImageUrl（可选项）：tableColumns 中 name 为__ 的字段在 type=image有效
 */
export const mockTableBaseInfoOrderData = [
    {
        projectHouseOrderId: "BPHO1852172497479553",
        projectId: "BP185190954456188928",
        projectName: "测试活动",
        houseAddress: "莲花小区1栋1单元9002",
        bookUserName: "张三",
        bookUserPhone: "13811012138",
        orderStatusName: "已完成",
        userStatusName: "归西",
        createTime: "2024-11-11 11:11",
        houseImage: "photo1",
        webShowDetailOp: true,
        webShowDeleteOp: true,
        userStatusNameWebColorName: "red",
        userStatusNameWebIconName: "fa-solid fa-xmark",
        orderStatusNameWebColorName: "rgb(68, 117, 80)",
        houseImageWebImageUrl: "https://picsum.photos/1200/100",
    },
    {
        projectHouseOrderId: "BPHO1852172497420832",
        projectId: "BP185190954456188928",
        projectName: "测试活动",
        houseAddress: "莲花小区1栋1单元9003",
        bookUserName: "尼古拉斯赵四",
        bookUserPhone: "13811012139",
        orderStatusName: "已完成",
        userStatusName: "存活",
        houseImage: "photo2",
        createTime: "2024-11-11 11:11",
        webShowDetailOp: true,
        webShowDeleteOp: false,
        userStatusNameWebColorName: "green",
        userStatusNameWebIconName: "fa-solid fa-check",
        orderStatusNameWebColorName: "rgb(68, 117, 80)",
        houseImageWebImageUrl: "https://picsum.photos/500/300",
    },
    {
        projectHouseOrderId: "BPHO1852172497420833",
        projectId: "BP185190954456188929",
        projectName: "测试活动",
        houseAddress: "莲花小区1栋1单元9004",
        bookUserName: "尼古拉斯赵四",
        bookUserPhone: "13811012139",
        orderStatusName: "已完成",
        userStatusName: "存活",
        houseImage: "photo2",
        createTime: "2024-11-11 11:11",
        webShowDetailOp: false,
        webShowDeleteOp: false,
        userStatusNameWebColorName: "green",
        userStatusNameWebIconName: "fa-regular fa-heart",
        orderStatusNameWebColorName: "cyan",
        houseImageWebImageUrl: "https://picsum.photos/100/100",
    },
    {
        projectHouseOrderId: "BPHO1852172497420834",
        projectId: "BP185190954456188929",
        projectName: "测试活动",
        houseAddress: "莲花小区1栋1单元9005",
        bookUserName: "尼古拉斯赵四",
        bookUserPhone: "13811012139",
        orderStatusName: "已完成",
        userStatusName: "存活",
        houseImage: "photo2",
        createTime: "2024-11-11 11:11",
        webShowDetailOp: true,
        webShowDeleteOp: true,
        userStatusNameWebColorName: "green",
        userStatusNameWebIconName: "fa-regular fa-smile",
        orderStatusNameWebColorName: "yellow",
        houseImageWebImageUrl: "https://picsum.photos/400/300",
    },
    {
        projectHouseOrderId: "BPHO1852172497420835",
        projectId: "BP185190954456188929",
        projectName: "测试活动",
        houseAddress: "莲花小区1栋1单元9006",
        bookUserName: "尼古拉斯弟弟弟弟",
        bookUserPhone: "13811012139",
        orderStatusName: "已完成",
        userStatusName: "存活",
        houseImage: "photo2",
        createTime: "2024-11-11 11:33",
        webShowDetailOp: false,
        webShowDeleteOp: false,
        userStatusNameWebColorName: "green",
        userStatusNameWebIconName: "fa-regular fa-bell",
        orderStatusNameWebColorName: "rgb(68, 17, 180)",
        houseImageWebImageUrl: "https://picsum.photos/500/400",
    },
    {
        projectHouseOrderId: "BPHO1852172497420836",
        projectId: "BP185190954456188929",
        projectName: "测试活动",
        houseAddress: "莲花小区1栋1单元9007",
        bookUserName: "尼古拉斯赵武",
        bookUserPhone: "13811012139",
        orderStatusName: "已完成",
        userStatusName: "下落不明",
        houseImage: "photo2",
        createTime: "2024-11-11 11:22",
        webShowDetailOp: false,
        webShowDeleteOp: true,
        userStatusNameWebColorName: "green",
        userStatusNameWebIconName: "fa-regular fa-file",
        orderStatusNameWebColorName: "rgb(168, 17, 80)",
        houseImageWebImageUrl: "https://picsum.photos/500/200",
    },
]