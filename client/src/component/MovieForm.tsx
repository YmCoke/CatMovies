import React from "react";
import { Form, Input, Button, Checkbox, Col, Row, InputNumber, Switch } from "antd";
import { ImgUploader } from "./ImgUploader";
import { IMovie } from "../services/MovieService";

const { TextArea } = Input;

interface IProps {
    FormInitialValues: IMovie
    onFinish: (values: IMovie) => void
}

export default class MovieForm extends React.Component<IProps> {

    static defaultProps = {
        FormInitialValues: {
            isClassic: false,
            isHot: false,
            isComming: false,
            description: "",
        }
    }

    private getAreaGroup = () => {
        const areaGroup = [
            { label: '中国大陆', value: '中国大陆' },
            { label: '美国', value: '美国' },
            { label: '欧洲', value: '欧洲' },
            { label: '日本', value: '日本' },
            { label: '韩国', value: '韩国' },
            { label: '香港', value: '香港' },
            { label: '台湾', value: '台湾' },
            { label: '泰国', value: '泰国' },
            { label: '印度', value: '印度' },
            { label: '法国', value: '法国' },
            { label: '英国', value: '英国' },
            { label: '俄罗斯', value: '俄罗斯' },
            { label: '意大利', value: '意大利' },
            { label: '西班牙', value: '西班牙' },
            { label: '德国', value: '德国' },
            { label: '波兰', value: '波兰' },
            { label: '澳大利亚', value: '澳大利亚' },
            { label: '伊朗', value: '伊朗' },
            { label: '其他', value: '其他' },
        ]
        return areaGroup.map(a => (<Col span={4} key={a.value}>
            <Checkbox value={a.value}>{a.label}</Checkbox>
        </Col>));
    }

    private getTypesGroup = () => {
        const typesGroup = [
            { label: '爱情', value: '爱情' },
            { label: '喜剧', value: '喜剧' },
            { label: '动画', value: '动画' },
            { label: '剧情', value: '剧情' },
            { label: '恐怖', value: '恐怖' },
            { label: '惊悚', value: '惊悚' },
            { label: '科幻', value: '科幻' },
            { label: '动作', value: '动作' },
            { label: '悬疑', value: '悬疑' },
            { label: '犯罪', value: '犯罪' },
            { label: '冒险', value: '冒险' },
            { label: '战争', value: '战争' },
            { label: '奇幻', value: '奇幻' },
            { label: '运动', value: '运动' },
            { label: '家庭', value: '家庭' },
            { label: '古装', value: '古装' },
            { label: '武侠', value: '武侠' },
            { label: '西部', value: '西部' },
            { label: '历史', value: '历史' },
            { label: '传记', value: '传记' },
            { label: '歌舞', value: '歌舞' },
            { label: '黑色电影', value: '黑色电影' },
            { label: '短片', value: '短片' },
            { label: '纪录片', value: '纪录片' },
            { label: '其他', value: '其他' },
        ]
        return typesGroup.map(t => (<Col span={4} key={t.value}>
            <Checkbox value={t.value}>{t.label}</Checkbox>
        </Col>));
    }

    render() {
        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 16 },
        };
        return (
            <Form
                scrollToFirstError
                initialValues={
                    {
                        ...this.props.FormInitialValues
                    }
                }
                onFinish={(values) => {
                    this.props.onFinish(values as IMovie);
                }}
                {...layout}
            >
                <Form.Item
                    label="电影名称"
                    name="name"
                    rules={[{ required: true, message: "电影名称不能为空" }, { min: 4, message: "电影名称字数不能小于4" }, { max: 12, message: "电影名称的长度不能超过12" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="封面图"
                    name="poster"
                >
                    <ImgUploader />
                </Form.Item>
                <Form.Item
                    label="电影时长"
                    name="timeLong"
                    rules={[{ required: true, message: '电影时长不能为空' }, { type: 'number', min: 1, message: "电影时长不足一分钟, 请检查时长是否有误" }, { type: 'number', max: 99999, message: "电影时长超过99999分钟, 请检查时长是否有误" }]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="上映地区"
                    name="area"
                    rules={[{ required: true, message: '电影的上映地区不能为空' }, { type: 'array', min: 1, message: "电影的上映地区不能小于1" }]}
                >
                    <Checkbox.Group style={{ width: '100%' }} >
                        <Row gutter={[8, 10]} style={{ marginTop: 1 }}>
                            {this.getAreaGroup()}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item
                    label="类型"
                    name="types"
                    rules={[{ required: true, message: '电影的类型不能为空' }, { type: 'array', min: 1, message: "电影的类型不能小于1" }]}
                >
                    <Checkbox.Group style={{ width: '100%' }} >
                        <Row gutter={[8, 10]} style={{ marginTop: 1 }}>
                            {this.getTypesGroup()}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item
                    label="是否经典"
                    name="isClassic"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    label="是否即将上映"
                    name="isComming"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    label="是否热映"
                    name="isHot"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    label="描述"
                    name="description"
                >
                    <TextArea defaultValue="" />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 16, offset: 2 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}