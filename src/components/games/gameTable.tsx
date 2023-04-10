import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { MuiTableWrapper, GameTableWrapper } from '../../styles/styles';
import { IGame } from '../../model/game/game';
import MUIDataTable from 'mui-datatables';
import EditIcon from '@material-ui/icons/Edit';

interface Props {
    title: string;
    games: IGame[];
    userId: string;
}

const GameTable: React.FC<Props> = ({ title, games, userId }) => {
    const columns = [
        {
            name: '',
            label: '',
            options: {
                filter: false,
                sort: false
            }
        },
        {
            name: 'title',
            label: 'Title',
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: 'release_date',
            label: 'Date',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const game = games.find(game => game.title === tableMeta.rowData[1])!;
                    const release_date = game.release_date;
                    if (release_date) {
                        return moment(new Date(release_date)).format('DD/MM/YYYY');
                    }
                }
            }
        },
        {
            name: 'platform',
            label: 'Platform',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'status',
            label: 'Status',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'Actions',
            label: 'Actions',
            options: {
                filter: false,
                sort: false,

                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <Link
                                to={`/user/${userId}/games/${
                                    games.find(game => game.title === tableMeta.rowData[1])!._id
                                }/edit`}
                            >
                                <EditIcon style={{ fontSize: '1.3em' }} />
                            </Link>
                        </>
                    );
                }
            }
        }
    ];

    const data = games;

    const options = {
        responsive: 'scrollMaxHeight',
        pagination: false,
        filter: false,
        search: false,
        print: false,
        download: false,
        viewColumns: false,
        selectableRows: 'none'
        //  filterType: 'checkbox',
        // onRowClick
        // onCellClick
    };

    return (
        <>
            <GameTableWrapper>
                <MuiTableWrapper>
                    <MUIDataTable title={title} data={data} columns={columns} options={options} />
                </MuiTableWrapper>
            </GameTableWrapper>
        </>
    );
};

export default GameTable;
