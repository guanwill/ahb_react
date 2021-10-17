import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { callUpdateGameApi, callDeleteGameApi } from '../../actions/game/gameActions';
import { AppState } from '../../store';
import isTokenExpired from '../../helpers/isTokenExpired';

// MUI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {
    ButtonWrapper,
    InputField,
    SelectField,
    TextAreaField,
    PageTitle,
    ContainerInner,
    BackLinkWrapper
} from '../../styles/styles';
import { Link, useHistory, useParams } from 'react-router-dom';
import { IUserGamesStore, IGameAddedOrUpdatedResponse, IGameLocal } from '../../model/game/game';

interface Props {
    callUpdateGameApi(gameArgs: Partial<IGameLocal>, user_id: string, game_id: string): IGameAddedOrUpdatedResponse;
    callDeleteGameApi(user_id: string, game_id: string);
    userGames: IUserGamesStore;
}

interface State {
    title: string;
    status: string;
    platform: string;
    release_date?: string | null;
    genre?: string | null;
    rating?: number | null;
    review?: string | null;
    comments?: string | null;
}

interface RouteParams {
    user_id: string;
    game_id: string;
}

const EditGame: React.FC<Props> = ({ callUpdateGameApi, callDeleteGameApi, userGames }) => {
    const history = useHistory();
    const { user_id, game_id } = useParams();
    const [game, setGame] = useState(null);
    const [gameMessage, setGameMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = async event => {
        const newState = { [event.target.name]: event.target.value } as Pick<State, keyof State>;
        await setGame({ ...game, ...newState });
    };

    const deleteGame = (user_id, game_id) => {
        if (window.confirm('Delete Game?')) {
            callDeleteGameApi(user_id, game_id);
            history.push(`/user/${user_id}/games`);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        // check if edited game has same title as an existing game
        let gameExists = userGames.games.find(g => g.title === game.title);

        if (gameExists && gameExists.title && gameExists._id !== game_id) {
            setGameMessage('Game already exists');
        } else {
            let response;
            const { title, genre, platform, release_date, status, rating, review, comments } = game;

            const gameArgs = {
                title,
                genre: genre ? genre : '',
                platform,
                release_date: release_date && release_date !== 'Invalid date' ? release_date : null,
                status,
                rating: rating ? rating : Number(''),
                review,
                comments
            };

            try {
                setIsLoading(true);
                response = await callUpdateGameApi(gameArgs, user_id, game_id);
            } catch (e) {
                throw e;
            } finally {
                setIsLoading(false);
            }

            setGameMessage('Game updated');

            if (response.message === 'Game updated') {
                history.push(`/user/${user_id}/games`);
            }
        }
    };

    useEffect(() => {
        if (isTokenExpired()) {
            console.log('IS EXPIRED? ', isTokenExpired());
            history.push('/login');
        }

        const gamesList = userGames.games;
        const gameToEditId = game_id;
        const gameToEdit = gamesList.find(game => game._id === gameToEditId);

        let newGameState;

        if (gameToEdit) {
            newGameState = {
                _id: gameToEdit._id,
                user: gameToEdit.user,
                title: gameToEdit.title,
                genre: gameToEdit.genre,
                platform: gameToEdit.platform,
                release_date: moment(gameToEdit.release_date).format('YYYY-MM-DD'),
                status: gameToEdit.status,
                rating: gameToEdit.rating,
                review: gameToEdit.review,
                comments: gameToEdit.comments
            };
            setGame(newGameState);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <ContainerInner>
                <BackLinkWrapper>
                    <Link to={`/user/${user_id}/games/`}>Back</Link>
                </BackLinkWrapper>
                <PageTitle>Edit Game</PageTitle>

                <p>{gameMessage}</p>

                <div>
                    <form id="EditGame" onSubmit={handleSubmit}>
                        <div>
                            <InputField
                                type="input"
                                placeholder="Title"
                                className="form-control"
                                name="title"
                                value={game && game.title ? game.title : ''}
                                required={true}
                                onChange={e => handleInputChange(e)}
                            />
                        </div>

                        <div>
                            <SelectField
                                name="genre"
                                id="genre"
                                value={game && game.genre ? game.genre : ''}
                                onChange={e => handleInputChange(e)}
                            >
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
                                value={game && game.platform ? game.platform : ''}
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
                                placeholder="Release date"
                                className="form-control"
                                name="release_date"
                                value={game ? game.release_date : ''}
                                onChange={e => handleInputChange(e)}
                            />
                        </div>

                        <div>
                            <SelectField
                                name="status"
                                id="status"
                                data-testid="status"
                                value={game && game.status ? game.status : ''}
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
                                value={game && game.rating ? game.rating : Number('')}
                                onChange={e => handleInputChange(e)}
                            />
                        </div>

                        <div>
                            <TextAreaField
                                placeholder="Review"
                                className="form-control"
                                name="review"
                                value={game && game.review ? game.review : ''}
                                onChange={e => handleInputChange(e)}
                            />
                        </div>

                        <TextAreaField
                            placeholder="Comments"
                            className="form-control"
                            name="comments"
                            value={game && game.comments ? game.comments : ''}
                            onChange={e => handleInputChange(e)}
                        />

                        {isLoading && <p>loading...</p>}

                        <div>
                            <ButtonWrapper>
                                <Button variant="outlined" color="primary" type="submit" form="EditGame">
                                    Update Game
                                </Button>
                            </ButtonWrapper>
                        </div>
                    </form>
                    <ButtonWrapper>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            onClick={() => {
                                deleteGame(user_id, game_id);
                            }}
                        >
                            Delete Game
                        </Button>
                    </ButtonWrapper>
                </div>
            </ContainerInner>
        </Container>
    );
};

const mapStateToProps = (state: AppState) => ({
    userGames: state.userGames
});

const mapDispatchToProps = {
    callUpdateGameApi,
    callDeleteGameApi
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGame);
