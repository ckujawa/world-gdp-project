import React, { Component } from 'react'
import styled from 'styled-components'

const PageWrapper = styled.div`
    display: flex;

`

const PageBlock = styled.div`
    border: 1px solid var(--black);
    width: 3rem;
    height: 3rem;
    font-size: 1.7rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    transition: all .5s ease-in-out;

    &.current {
        transform: scale(1.2);
        border-color: #69969C;
        border-width: 2px;
    }
`
const Pager = (props) => {
    
    const { pageSize, countryCount, currentPage, setCurrentPage }:
    {pageSize:number, countryCount: number, currentPage: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>} = props;

    const totalPages = Math.ceil(countryCount / pageSize);
    const prevPage = currentPage - 1 === 0 ? 1 : currentPage - 1;
    const nextPage = currentPage + 1 > totalPages ? totalPages : currentPage + 1; 
    const hasPrevPage = prevPage !== 1;
    const hasNextPage = nextPage <= totalPages;

    function setPageNumber(newPage: number) {
        setCurrentPage(newPage);
    }

    console.log(totalPages);
    return (
        <PageWrapper>
            { currentPage > 1 && <PageBlock onClick={() => setPageNumber(1)}>&lt;&lt;</PageBlock>}
            { hasPrevPage && <PageBlock onClick={() => setPageNumber(currentPage - 1)}>&lt;</PageBlock>}
            {
                Array.from({ length: totalPages }).map((_, i) => (
                    
                    <PageBlock key={`page${i}`} className = {i == currentPage -1 && "current"}onClick={() => setPageNumber(i+1)}>{i + 1}</PageBlock>
                ))
            
            }
            { hasNextPage && <PageBlock onClick={()=> setPageNumber(currentPage + 1)}>&gt;</PageBlock>}
            { currentPage < totalPages && <PageBlock onClick={() => setPageNumber(totalPages)}>&gt;&gt;</PageBlock>}
        </PageWrapper>
    )
}

export default Pager;