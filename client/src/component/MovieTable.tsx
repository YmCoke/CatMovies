import React, { useEffect } from "react";
import { IMovieState, SwitchType } from "../redux/reducer/MovieReducer";
import { Table, Tag, Switch, Button, message, Popconfirm, Input } from 'antd';
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { IMovie } from "../services/MovieService";
import { TagColors } from './CommonType';
import noImgUrl from '../assets/no_img.jpg';
import { NavLink } from 'react-router-dom';
import { PaginationConfig } from "antd/lib/pagination";
import { SearchOutlined } from '@ant-design/icons';

let lastInputValue: string = "";

function getRandom(min: number, max: number) {
    const gap = max - min;
    return Math.floor(Math.random() * gap + min);
}

function getColumns(props: IMovieState & IMovieTableEvent): ColumnsType<IMovie> {
    return [
        {
            title: "Poster",
            dataIndex: "poster",
            render: (imgurl) => {
                if (imgurl) {
                    return <img src={imgurl} alt={""} style={{width: '70px'}}/>
                }
                return <img src={noImgUrl} alt={""} />
            }
        },
        {
            title: "Name",
            dataIndex: "name",
            filterDropdown: () => (
                <div style={{ padding: 8 }}>
                    <Input
                        value={props.condition.key}
                        onChange={(e) => props.onKeyChange(e.target.value)}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                        onPressEnter={() => {
                            if (props.condition.key !== lastInputValue) {
                                console.log(lastInputValue === props.condition.key)
                                props.onSearch();
                                lastInputValue = props.condition.key;
                            }
                        }}
                    />
                    <Button
                        onClick={() => {
                            if (props.condition.key !== lastInputValue) {
                                console.log(lastInputValue === props.condition.key)
                                props.onSearch();
                                lastInputValue = props.condition.key;
                            }
                        }}
                        type="primary"
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
                  </Button>
                    <Button
                        size="small"
                        style={{ width: 90 }}
                        onClick={() => props.onKeyChange("")}
                    >
                        Reset
                  </Button>
                </div>
            ),
            filterIcon: <SearchOutlined />
        },
        {
            title: "Type",
            dataIndex: "types",
            render: (types: string[]) => types.map((t, i) => (<Tag key={i} color={TagColors[getRandom(0, TagColors.length)]}>{t}</Tag>))
        },
        {
            title: "Area",
            dataIndex: "area",
            render: (types: string[]) => types.map((t, i) => (<Tag key={i} color={TagColors[getRandom(0, TagColors.length)]}>{t}</Tag>))
        },
        {
            title: "Timelong",
            dataIndex: "timeLong",
            render: (text: string) => text + "分钟"
        },
        {
            title: "Hot",
            dataIndex: "isHot",
            render: (isHot: boolean, record) => {
                return <Switch checked={isHot} onChange={newVal => {
                    props.onSwitchChange(SwitchType.isHot, newVal, record._id!);
                }} />
            }
        },
        {
            title: "Classic",
            dataIndex: "isClassic",
            render: (isClassic: boolean, record) => {
                return <Switch checked={isClassic} onChange={newVal => {
                    props.onSwitchChange(SwitchType.isClassic, newVal, record._id!);
                }} />
            }
        },
        {
            title: "Comming",
            dataIndex: "isComming",
            render: (isComming: boolean, record) => {
                return <Switch checked={isComming} onChange={newVal => {
                    props.onSwitchChange(SwitchType.isComming, newVal, record._id!);
                }} />
            }
        },
        {
            title: "Operation",
            dataIndex: "_id",
            render: (id: string) => {
                return <div>
                    <NavLink to={"/movie/modify/" + id}>
                        <Button type="primary" size="small">操作</Button>
                    </NavLink>
                    <Popconfirm placement="top" title="Are you sure to delete this movie" onConfirm={async () => {
                        await props.onDelete(id);
                        message.success('Delete is success');
                    }} okText="Yes" cancelText="No">
                        <Button type="danger" size="small">删除</Button>
                    </Popconfirm>
                </div>
            }
        }
    ]
}

export interface IMovieTableEvent {
    onLoad: () => void
    onSwitchChange: (type: SwitchType, newVal: boolean, id: string) => void
    onDelete: (id: string) => Promise<void>
    onChange: (current: number) => void
    onKeyChange: (newKey: string) => void
    onSearch: () => void
}

function getPagination(props: IMovieState & IMovieTableEvent): false | TablePaginationConfig {
    if (props.total === 0) return false;
    return {
        current: props.condition.page,
        total: props.total,
        pageSize: props.condition.limit
    }
}

function handleChange(props: IMovieState & IMovieTableEvent) {
    return function (pagination: PaginationConfig) {
        console.log("发生变化");
        props.onChange(pagination.current!);
    }
}

export const MovieTable: React.FC<IMovieState & IMovieTableEvent> = (props) => {
    // 1. 请求数据
    // eslint-disable-next-line
    useEffect(() => { props.onLoad() }, [props.onLoad])
    return (
        <Table
            loading={props.isLoading}
            rowKey="_id"
            dataSource={props.data}
            columns={getColumns(props)}
            pagination={getPagination(props)}
            onChange={handleChange(props)}
        />
    );
}