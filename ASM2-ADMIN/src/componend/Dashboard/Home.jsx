import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useSelector } from 'react-redux';
import Stats from '../../UI/Stats';
import { TransactionHome } from './TransactionHome';
import DashboardFilter from './DashboardFilter';
import DurationChart from './DurationChart';
import { GetInfoBoardService, GetTransactionService } from '../../services/services';
import Spinner from "../../UI/Spinner"
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 3rem;
`;
const StyledTable = styled.div`
    grid-column: 1/4;
`
const StyledHead = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 1rem;
`
const Home = () => {
    const [stateinfoboard, setstateinfoboard] = useState()
    const [statetransaction, settransaction] = useState()
    const admin = useSelector(state => state.admin)
    const infoboard = GetInfoBoardService(admin.token)
    const transaction = GetTransactionService(admin.token)
    useEffect(() => {
        setstateinfoboard(infoboard.data)
    }, [infoboard.data])
    useEffect(() => {
        settransaction(transaction.data)
    }, [transaction.data])

    return (
        <>
            {
                (infoboard.isLoading || transaction.isLoading) && <Spinner />
            }
            {
                infoboard.isError && !infoboard.isLoading && transaction.isError && !transaction.isLoading && <div>Some thing wrong!!!</div>
            }
            {
                !infoboard.isError && !infoboard.isLoading && !transaction.isError && !transaction.isLoading &&
                <StyledDashboardLayout>
                    {
                        stateinfoboard &&
                        <Stats
                            users={stateinfoboard?.usercount}
                            orders={stateinfoboard?.datatransactioncount}
                            earning={stateinfoboard?.total}
                            balance={stateinfoboard?.total}
                        />
                    }
                    <StyledTable>
                        <StyledHead >
                            <h1>Transaction</h1>
                            <DashboardFilter />
                        </StyledHead>

                        {
                            statetransaction &&
                            <TransactionHome transaction={statetransaction} />

                        }
                    </StyledTable>
                    <DurationChart transaction={statetransaction} />

                </StyledDashboardLayout>
            }
        </>
    )
}

export default Home;
