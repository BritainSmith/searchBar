import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {IoSearch, IoClose} from 'react-icons/io5';
import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import { MoonLoader } from 'react-spinners';
import { useDebounce } from '../../hooks/debounceHook';
import axios from 'axios';

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

const CloseIcon= styled(motion.span)`
    color:#bebebe;
    font-size: 23px;
    vertical-align: middle;
    transition: all 200ms ease-in-out;
    cursor: pointer;

    &:hover {
        color:#dfdfdf;
    }
`

const SearchContent = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
padding: 1em;
`;

const LoadingWrapper = styled.div`
width: 100%;
height: 100%;
display : flex;
align-items: center;
justify-content: center;
`;


const LineSeperator = styled.span`
display: flex;
min-width: 100%;
min-height: 2px;
background-color: #d8d8d878;
`
const containerTransition = {type: 'spring', damping: 22, stiffness: 150}

const conainterVariants = {
    expanded: {
        height: "20em",
    },
    collapsed: {
        height: "3.8em"
    }
}

export function SearchBar(props){

    const [isExpanded, setExpanded]= useState(false);
    const [parentRef, isClickedOutside] = useClickOutside();
    const inputRef= useRef();
    const [searchQuery, setSearchQuery]= useState("");
    const [isLoading, setLoading]=useState(false);

    const changeHandler = (e)=>{
        e.preventDefault();
        setSearchQuery(e.target.value);
    }

    //opening search container.
    const expandContainer = () => {
        setExpanded(true);
    }

    //setting expanded state to false, collapsing container, clearing search.
    const collapseContainer = () => {
        setExpanded(false);
        setSearchQuery("");
        if (inputRef.current) inputRef.current.value="";
    }

    //checking for clicks outside of the search bar
    useEffect(()=>{
        if(isClickedOutside) collapseContainer();
    }, [isClickedOutside]);

    
    //encoding search query with endcodeURI
    const prepareSearchQuery = (query) => {

        const url = `http://api.tvmaze.com/search/shows?q=${query}`;

        return encodeURI(url);
        
    }

    //async api call to tvmaze api.

    const searchTvShow = async ()=>{

        //if the search query is an empty string/empty, return do not call.
        if(!searchQuery || searchQuery.trim() === "")
        return;
        
        setLoading(true);

        const URL = prepareSearchQuery(searchQuery);
        
        //get request with axios to contact encoded API url
        const response = await axios.get(URL).catch((err)=>{
            console.log("Error: ", err);
        });

        if(response) {
            console.log("Response: ", response.data);
        }
    }


    useDebounce(searchQuery, 500, searchTvShow);

    console.log("Value: ", searchQuery);


    return <SearchBarContainer animate={isExpanded ? "expanded" : "collapse"} 
            variants={conainterVariants}
            ref={parentRef}
            transition={containerTransition}>
        <SearchInputContainer>
            <SearchIcon>
                <IoSearch/>
            </SearchIcon>
            <SearchInput 
            placeholder="Search for Series/Shows" 
            onFocus={expandContainer} 
            ref={inputRef}
            value={searchQuery}
            onChange={changeHandler}
            />

            <AnimatePresence>
            {isExpanded && <CloseIcon 
            key="closeIcon" 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity:0}}
            onClick={collapseContainer}
            transition = {{ duration: 0.2}}>
            <IoClose />
            </CloseIcon>}
            </AnimatePresence>
        </SearchInputContainer>
        <LineSeperator/>
        <SearchContent>
            <LoadingWrapper>
                <MoonLoader loading color="#000" size={20}/>
            </LoadingWrapper>
        </SearchContent>
    </SearchBarContainer>
}