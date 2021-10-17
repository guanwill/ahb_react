import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { callAddGameApi } from '../../actions/game/gameActions';
import { AppState } from '../../store';
import isTokenExpired from '../../helpers/isTokenExpired';

// Materialui
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {
    InputField,
    PageTitle,
    ButtonWrapper,
    SelectField,
    TextAreaField,
    ContainerInner,
    BackLinkWrapper
} from '../../styles/styles';
import { IUserGamesStore, IGameToAdd, IGameLocal, IGameAddedOrUpdatedResponse } from '../../model/game/game';
import { Link as MaterialUiLink } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';

interface Props {
    callAddGameApi(user_id: string, gameArgs: Partial<IGameLocal>): IGameAddedOrUpdatedResponse;
    userGames: IUserGamesStore;
    gameToAdd: IGameToAdd;
}

const AddGame: React.FC<Props> = ({ callAddGameApi, userGames, gameToAdd }) => {
    const history = useHistory();
    const { user_id } = useParams();
    const [game, setGame] = useState(null);
    const [gameMessage, setGameMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = async event => {
        const newState = { [event.target.name]: event.target.value } as Pick<IGameLocal, keyof IGameLocal>;
        await setGame({ ...game, ...newState });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const { title, genre, platform, release_date, status, rating, review, comments } = game;
        const gameArgs = { title, genre, platform, release_date, status, rating, review, comments };

        let response;

        try {
            setIsLoading(true);
            response = await callAddGameApi(user_id, gameArgs);
        } catch (e) {
            throw e;
        } finally {
            setIsLoading(false);
        }

        const { message } = response;

        setGameMessage(message);

        if (message !== 'Game already exists') {
            if (gameToAdd.title) {
                history.push(`/`);
            } else {
                history.push(`/user/${user_id}/games`);
            }
        }
    };

    const goBackToPreviousPage = () => {
        if (gameToAdd.title) {
            history.push(`/`);
        } else {
            history.push(`/user/${user_id}/games`);
        }
    };

    useEffect(() => {
        if (isTokenExpired()) {
            console.log('token is expired');
            history.push('/login');
        }

        if (gameToAdd.title) {
            setGame({
                title: gameToAdd.title,
                release_date: gameToAdd.release_date !== 'Invalid date' ? gameToAdd.release_date : null
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <ContainerInner>
                <BackLinkWrapper>
                    <MaterialUiLink
                        href="#"
                        onClick={() => {
                            goBackToPreviousPage();
                        }}
                    >
                        Back
                    </MaterialUiLink>
                </BackLinkWrapper>
                <PageTitle>Add Game</PageTitle>

                <p>{gameMessage}</p>

                <div>
                    <form id="AddGame" onSubmit={handleSubmit}>
                        <div>
                            <InputField
                                type="input"
                                value={game ? game.title : ''}
                                placeholder="Title"
                                className="form-control"
                                name="title"
                                required={true}
                                onChange={e => handleInputChange(e)}
                            />
                        </div>

                        <div>
                            <SelectField name="genre" id="genre" onChange={e => handleInputChange(e)}>
                                <option value="">Select Genre</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Action">Action</option>
                                <option value="Fighting">Fighting</option>
                                <option value="FPS">FPS</option>
                                <option value="Sport">Sport</option>
                                <option value="RPG">RPG</option>
                                <option value="Puzzle">Puzzle</option>
                                <option value="Simulation">Simulation</option>
                                <option value="Other">Other</option>
                            </SelectField>
                        </div>

                        <div>
                            <SelectField
                                name="platform"
                                id="platform"
                                data-testid="platform"
                                onChange={e => handleInputChange(e)}
                                required={true}
                            >
                                <option value="">Select Platform</option>
                                <option value="Playstation">Playstation</option>
                                <option value="XBOX">XBOX</option>
                                <option value="Switch">Nintendo Switch</option>
                                <option value="PC">PC</option>
                                <option value="Other">Other</option>
                            </SelectField>
                        </div>

                        <div>
                            <InputField
                                type="date"
                                value={game && game.release_date ? game.release_date : ''}
                                placeholder="Release date"
                                className="form-control"
                                name="release_date"
                                onChange={e => handleInputChange(e)}
                            />
                        </div>

                        <div>
                            <SelectField
                                name="status"
                                id="status"
                                data-testid="status"
                                onChange={e => handleInputChange(e)}
                                required={true}
                            >
                                <option value="">Select Status</option>
                                <option value="Playing">Playing</option>
                                <option value="Finished">Finished</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Wishlist">On Wishlist</option>
                                <option value="Maybe">Maybe</option>
                            </SelectField>
                        </div>

                        <div>
                            <InputField
                                type="number"
                                placeholder="Rating"
                                className="form-control"
                                name="rating"
                                onChange={e => handleInputChange(e)}
                            />
                        </div>

                        <div>
                            <TextAreaField
                                placeholder="Review"
                                className="form-control"
                                name="review"
                                onChange={e => handleInputChange(e)}
                            />
                        </div>

                        <TextAreaField
                            placeholder="Comments"
                            className="form-control"
                            name="comments"
                            onChange={e => handleInputChange(e)}
                        />

                        {isLoading && <p>loading...</p>}

                        <div>
                            <ButtonWrapper>
                                <Button variant="outlined" color="primary" type="submit" form="AddGame">
                                    Add Game
                                </Button>
                            </ButtonWrapper>
                        </div>
                    </form>
                </div>
            </ContainerInner>
        </Container>
    );
};

const mapStateToProps = (state: AppState) => ({
    userGames: state.userGames,
    gameToAdd: state.gameToAdd
});

const mapDispatchToProps = {
    callAddGameApi
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGame);
