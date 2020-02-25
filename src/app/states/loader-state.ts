import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LoaderModel } from 'app/models/loader-model';
import { ShowLoader } from 'app/actions/todo-actions';

@State<LoaderModel>({
    name: 'loader',
    defaults: {
        show: false
    }
})
export class LoaderState {
    @Selector()
    static getLoader(state: LoaderModel) {
        return state.show;
    }

    @Action(ShowLoader)
    loader(stateContext: StateContext<LoaderModel>, action: ShowLoader) {
        const state = stateContext.getState();
        stateContext.setState({
            ...state,
            show: action.loader.show
        });
    }
}
