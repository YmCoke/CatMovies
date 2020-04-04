import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import MovieForm from '../../component/MovieForm'
import { MovieService, IMovie } from '../../services/MovieService'
import { connect } from 'react-redux'
import { IRootState } from '../../redux/reducer/RootReducer'
import { message } from 'antd'

// 定义params中的属性
interface IParams {
    id: string
}

// interface IMovieModifyProps extends RouteComponentProps<IParams> {
//     // 写该组件需要使用到的props
// }

interface IMyProps {
    data: IMovie[]
}

type IMovieModifyProps = IMyProps & RouteComponentProps<IParams>

class MovieModify extends React.Component<IMovieModifyProps> {

    private modifyMovie = async (movie: IMovie) => {
        const resp = await MovieService.modify(this.props.match.params.id, movie);
        if(resp.err === null) {
            message.success("修改成功, 5s后转到电影列表页面", 5, () => {
                this.props.history.push('/movie');
            });
        }
        else {
            message.error("数据异常, 修改数据失败");
        }
    }

    render() {
        const movieid = this.props.match.params.id;
        const movie = this.props.data.find(d => d._id === movieid);
        return (
            <MovieForm onFinish={this.modifyMovie} FormInitialValues={movie} />
        )
    }
}

function mapStateToProps(state: IRootState) {
    return state.movie;
}

export default connect(mapStateToProps)(MovieModify);