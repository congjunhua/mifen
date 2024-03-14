import {Button, Card, Form, Input, Select, Space} from "antd"
import "./App.css"
import Title from "./components/title/Title"
import {DeleteOutlined, PlusCircleFilled, PlusOutlined} from '@ant-design/icons'
import FormItem from "antd/es/form/FormItem"
import { useState } from "react"
const {Search} = Input

/** 模拟接口数据 */
function guid() {
    function f() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
    }
    return (f()+f()+"-"+f()+"-"+f()+"-"+f()+"-"+f()+f()+f())
}
let items = []
for (let i = 0; i < 16; i++) {
    items[i] = guid()
}

/** 当前视觉焦点 */
let focus = ""

function App() {
    const [form] = Form.useForm()
    const [values, setValues] = useState([])
    const [formula, setFormula] = useState('')

    function itemOnClick(value) {
        if (!focus) {
            return
        }
        if (focus.startsWith("contract")) {
            let index = Number(focus.replace("contract", ""))
            let vs = form.getFieldsValue()
            let arr = [...vs["contracts"]]
            arr[index] = value
            form.setFieldValue("contracts", arr)
            setValues(arr)
            return
        }
        if (focus.startsWith("formula")) {
            let v = `${formula}[${value}]`
            form.setFieldValue("formula", v)
            setFormula(v)
        }
    }

    return (
        <Form
            form={form}
            initialValues={{h: "all"}}
        >
            <Title title="选择指标" />

            <Card
                className="card"
            >
                <Space
                    className="space"
                >
                    <FormItem
                        name="a"
                    >
                        <Select
                            placeholder="资产类型"
                            options={[
                                {value: 'a', label: <span>类型A</span>},
                                {value: 'b', label: <span>类型B</span>},
                                {value: 'c', label: <span>类型C</span>}
                            ]}
                        />
                    </FormItem>
                    <FormItem
                        name="b"
                    >
                        <Select
                            placeholder="品种分类"
                            options={[
                                {value: 'a', label: <span>分类A</span>},
                                {value: 'b', label: <span>分类B</span>},
                                {value: 'c', label: <span>分类C</span>}
                            ]}
                        />
                    </FormItem>
                    <FormItem
                        name="c"
                    >
                        <Select
                            placeholder="选择品种"
                            options={[
                                {value: 'a', label: <span>品种A</span>},
                                {value: 'b', label: <span>品种B</span>},
                                {value: 'c', label: <span>品种C</span>}
                            ]}
                        />
                    </FormItem>
                    <FormItem
                        name="d"
                    >
                        <Select
                            placeholder="选择品类"
                            options={[
                                {value: 'a', label: <span>品类A</span>},
                                {value: 'b', label: <span>品类B</span>},
                                {value: 'c', label: <span>品类C</span>}
                            ]}
                        />
                    </FormItem>
                </Space>

                <Space
                    className="space"
                >
                    <FormItem
                        name="e"
                    >
                        <Select
                            placeholder="特性1"
                            options={[
                                {value: 'a', label: <span>特性A</span>},
                                {value: 'b', label: <span>特性B</span>},
                                {value: 'c', label: <span>特性C</span>}
                            ]}
                        />
                    </FormItem>
                    <FormItem
                        name="f"
                    >
                        <Select
                            placeholder="特性2"
                            options={[
                                {value: 'a', label: <span>特性A</span>},
                                {value: 'b', label: <span>特性B</span>},
                                {value: 'c', label: <span>特性C</span>}
                            ]}
                        />
                    </FormItem>
                    <FormItem
                        name="g"
                    >
                        <Select
                            placeholder="特性3"
                            options={[
                                {value: 'a', label: <span>特性A</span>},
                                {value: 'b', label: <span>特性B</span>},
                                {value: 'c', label: <span>特性C</span>}
                            ]}
                        />
                    </FormItem>
                    <FormItem
                        name="h"
                    >
                        <Select
                            placeholder="请选择"
                            options={[
                                {value: 'all', label: <span>全部</span>},
                                {value: 'a', label: <span>品类A</span>},
                                {value: 'b', label: <span>品类B</span>},
                                {value: 'c', label: <span>品类C</span>}
                            ]}
                        />
                    </FormItem>
                    <FormItem>
                        <Search
                            placeholder="输入指标名称或szid"
                        />
                    </FormItem>
                </Space>

                <Space
                    className="items"
                >
                    {
                        items.map(v => 
                            (
                                <div
                                    key={v}
                                    className="item"
                                    onClick={() => {itemOnClick(v)}}
                                >
                                    <span>{v}</span>
                                    <PlusCircleFilled 
                                        style={{marginLeft: "auto"}}
                                    />
                                </div>
                            )
                        )
                    }
                </Space>
            </Card>

            <Title title="合约信息" />

            <Card
                className="card"
            >
                <Form.List 
                    name="contracts"
                >
                    {
                        (fields, {add, remove}) => (
                            <>
                                {fields.map(({key, name, ...restField}, i) => (
                                    <Space
                                        key={key}
                                        align="baseline"
                                        style={{width: "50%"}}
                                    >
                                        <Space
                                            align="baseline"
                                        >
                                            <Form.Item
                                                label={`合约(P${i+1})`}
                                                {...restField}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '未查询到合约配置信息',
                                                    }
                                                ]}
                                            >
                                                <Input 
                                                    placeholder="请选择合约"
                                                    allowClear
                                                    style={{width: "320px"}}
                                                    onFocus={() => {focus = `contract${i}`}}
                                                    value={values[i]}
                                                    onChange={({currentTarget: {value}}) => {
                                                        let arr = [...values]
                                                        arr[i] = value
                                                        setValues(arr)
                                                    }}
                                                />
                                            </Form.Item>
                                            <PlusCircleFilled
                                                onClick={() => {
                                                    let v = `${formula}P${i+1}`
                                                    form.setFieldValue("formula", v)
                                                    setFormula(v)
                                                }}
                                            />
                                        </Space>
                                        <DeleteOutlined 
                                            style={{marginLeft: "24px"}}
                                            onClick={() => remove(name)} 
                                        />
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button 
                                        type="dashed" 
                                        onClick={() => add()} 
                                        block icon={<PlusOutlined />}
                                    >
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                        )
                    }
                </Form.List>

                <FormItem
                    label="策略公式"
                    name="formula"
                >
                    <Input
                        placeholder="请输入"
                        onFocus={() => {focus = "formula"}}
                        value={formula}
                        onChange={({currentTarget: {value}}) => {
                            setFormula(value)
                        }}
                    />
                </FormItem>
            </Card>
        </Form>
    )
}

export default App
