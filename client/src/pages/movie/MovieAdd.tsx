import React from 'react'
import MovieForm from '../../component/MovieForm'
import { MovieService } from '../../services/MovieService'
import { RouteComponentProps } from 'react-router';

export class MovieAdd extends React.Component<RouteComponentProps> {
    
    render() {
        return (
            <MovieForm onFinish={async (movie) => MovieService.add(movie)} />
        )
    }
}