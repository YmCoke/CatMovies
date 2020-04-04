import { MovieTable, IMovieTableEvent } from '../../component/MovieTable';
import { connect } from 'react-redux';
import { IRootState } from '../../redux/reducer/RootReducer';
import { Dispatch } from 'react';
import { fetchMovies, switchChange, deleteMovie, createConditionAction } from '../../redux/action/MovieActions';

const mapStateToProps = (state: IRootState) => state.movie;

const mapDispatchToProps = (dispatch: Dispatch<any>): IMovieTableEvent => ({
  onLoad() {
    dispatch(fetchMovies({}));
  },
  onSwitchChange(type, newVal, id) {
    dispatch(switchChange(type, newVal, id));
  },
  async onDelete(id: string) {
    dispatch(deleteMovie(id));
  },
  onChange(newPage: number) {
    dispatch(fetchMovies({
      page: newPage
    }))
  },
  onKeyChange(newKey) {
    dispatch(createConditionAction({
      key: newKey
    }))
  },
  onSearch() {
    dispatch(fetchMovies({
      page: 1
    }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieTable);