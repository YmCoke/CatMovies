import React, { useRef } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { Home } from './movie/Home'
import Movie from './movie/Movie'
import { MovieAdd } from './movie/MovieAdd'
import MovieModify from './movie/MovieModify'
import { Layout, Menu } from 'antd';
import RouterListenerGuard from '../util/RouterListenerGuard'
import ScrollSet from '../util/ScrollSet'
import { IRootState } from '../redux/reducer/RootReducer'
import { connect } from 'react-redux'

const { Header, Sider } = Layout;

function mapStateToProps(state: IRootState) {
    return state;
}

interface IProps {
    router: any
}

function getMenuKey(props: IProps) {
    if (!props.router) return [];
    return [props.router.location.pathname];
}

const _Layout: React.FC<IProps> = (props) => {
    const defaultMenuKeys = getMenuKey(props);
    const ref: any = useRef();
    return (
        <div style={{ width: '100vw', height: '100vh', display: "flex" }}>
            <Layout>
                <Header>
                    <NavLink to="/">欢迎使用电影系统</NavLink>
                </Header>
                <Layout>
                    <Sider>
                        <Menu
                            mode="inline"
                            theme="dark"
                            defaultSelectedKeys={defaultMenuKeys}
                        >
                            <Menu.Item key="/">
                                <NavLink to="/">首页</NavLink>
                            </Menu.Item>
                            <Menu.Item key="/movie">
                                <NavLink to="/movie">电影列表</NavLink>
                            </Menu.Item>
                            <Menu.Item key="/movie/add">
                                <NavLink to="/movie/add">添加电影</NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <div style={{ padding: "1em" }} className="ant-layout-content" ref={ref}>
                        <Route exact={true} path="/" component={Home} />
                        <Route exact={true} path="/movie" component={Movie} />
                        <Route exact={true} path="/movie/add" component={MovieAdd} />
                        <Route exact={true} path="/movie/modify/:id" component={MovieModify} />
                    </div>
                </Layout>
            </Layout>
            <RouterListenerGuard onChange={() => {
                const mainScrollSet = new ScrollSet(ref.current);
                mainScrollSet.set(0, 0);
            }} />
        </div>
    )
}

export default connect(mapStateToProps)(_Layout);