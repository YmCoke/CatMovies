/**
 * 监听路由变化
 */
import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

interface IProps extends RouteComponentProps {
    onChange: (routeProps: RouteComponentProps) => void
}

const RouterListenGuard: React.FC<IProps> = (props) => {
    useEffect(() => {
        return props.history.listen(() => {
            props.onChange({ location: props.location, history: props.history, match: props.match });
        })
        // eslint-disable-next-line
    }, [props.location.pathname])
    return null;
}

export default withRouter(RouterListenGuard)