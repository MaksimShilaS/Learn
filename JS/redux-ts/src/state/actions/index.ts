import { ActionType } from '../action-types';

export type Action = SearchRepositoriesAction | SearchRepositoriesSuccessAction | SearchRepositoriesErrorAction;

interface SearchRepositoriesAction {
    type: ActionType.SEACRH_REPOSITORIES;
}

interface SearchRepositoriesSuccessAction {
    type: ActionType.SEACRH_REPOSITORIES_SUCCESS;
    payload: string[];
}

interface SearchRepositoriesErrorAction {
    type: ActionType.SEACRH_REPOSITORIES_ERROR;
    payload: string;
}
