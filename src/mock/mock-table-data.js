/**
 * [官方]
 * name：当前列code，唯一id同表不重复。用于指定表的主键id、指定自定义槽等功能
 * required（可选）：使用visible-columns属性后，该列仍然显示
 * label：实际显示在用户界面该行的文字
 * align（可选，默认 'right' ）：当前列框中数据的校准位置
 * field：绑定数据字段，一般和name相同
 *
 * [自定义]
 * cardShowLabel（可选，默认true）：卡片方式显示时，是否展示该列label
 * cardSite（可选，默认 'content' ）：卡片方式显示时，该字段在卡片的位置，
 *      可选项：content, title, subscript, footerRight, footerLeft, footerMiddle
 * type（可选，默认 'default'）：该列渲染方式，
 *      可选项：default, point, iconWithColor, image
 * iconName（可选项）：type=iconWithColor有效
 * colorName（可选项）：type=iconWithColor有效
 * iconSite（可选项，默认 'start'）：type=iconWithColor有效，可选项：start, end
 * imageUrl（可选项）：type=image有效
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
    },
    {
        name: 'bookUserPhone',
        field: 'bookUserPhone',
        label: '手机号',
        align: 'center',
    },
    {
        name: 'orderStatusName',
        field: 'orderStatusName',
        label: '订单状态',
        align: 'center',
    },
    {
        name: 'createTime',
        field: 'createTime',
        label: '创建时间',
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
    selectType: 'none',
}

export const mockTableBaseInfoOrderData = [
    {
        projectHouseOrderId: "BPHO1852172497479553",
        projectId: "BP185190954456188928",
        projectName: "测试活动",
        houseAddress: "莲花小区1栋1单元9002",
        bookUserName: "张三",
        bookUserPhone: "13811012138",
        orderStatusName: "已完成",
        createTime: "2024-11-11 11:11"
    },
]