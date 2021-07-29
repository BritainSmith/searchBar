import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {IoSearch, IoClose} from 'react-icons/io5';
import {useState} from 'react';
import {motion} from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';

const SearchBarContainer = styled(motion.div)`
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
    width: 95%;
    min-height: 3.8em;
    display: flex;
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

const SearchIcon = styled.span`
    color:#bebebe;
    font-size: 23px;
    margin-right: 10px;
    margin-top : 6px;
    vertical-align: middle;

`;

const CloseIcon= styled.span`
    color:#bebebe;
    font-size: 23px;
    vertical-align: middle;
    transition: all 200ms ease-in-out;
    cursor: pointer;

    &:hover {
        color:#dfdfdf;
    }
`

export function SearchBar(props){

    const [isExpanded, setExpanded]= useState(false);
    const [parentRef, isClickedOutside] = useClickOutside();
    const inputRef= useRef();

    const expandContainer = () => {
        setExpanded(true);
    }

    const collapseContainer = () => {
        setExpanded(false);
        if(inputRef.current)
        inputRef.current.value="";
    }
    const conainterVariants = {
        expanded: {
            height: "20em",
        },
        collapsed: {
            height: "3.8em"
        }
    }

    useEffect(()=>{
        if(isClickedOutside) collapseContainer();
    }, [isClickedOutside]);

    const containerTransition = {type: 'spring', damping: 22, stiffness: 150}

    return <SearchBarContainer animate={isExpanded ? "expanded" : "collapse"} 
            variants={conainterVariants}
            ref={parentRef}
            transition={containerTransition}>
        <SearchInputContainer>
            <SearchIcon>
                <IoSearch/>
            </SearchIcon>
            <SearchInput placeholder="Search for Series/Shows" onFocus={expandContainer} ref={inputRef}/>
            <CloseIcon onClick={collapseContainer}>
            <IoClose />
            </CloseIcon> 
        </SearchInputContainer>
    </SearchBarContainer>
}