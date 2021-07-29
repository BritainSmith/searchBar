import React from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 34em;
    height: 3.8em;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
    overflow: hidden;
    `;

const SearchInputContainer = styled.div`
    width: 100%;
    min-height: 4em;
    align-items: center;
    position: relative;
    padding: 2px 15px;

`;

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    font-size 21px;
    color: #12112e;
    border-radius: 6px;
    background-color: transparent;

    &:focus {
        outline: none;
        &::placeholder{
            opacity: 0;
        }
    }

    &::placeholder {
        color: gray;
        transition: all 250ms ease-in-out;
    }
`;


export function SearchBar(props){
    return <SearchBarContainer>
        <SearchInputContainer>
            <SearchInput placeholder="Search for Series/Shows"/>
        </SearchInputContainer>
    </SearchBarContainer>
}