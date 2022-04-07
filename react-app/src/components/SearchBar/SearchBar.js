import React from 'react'
import { getSearchResults } from '../../store/search'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@mui/material/TextField';

import './SearchBar.css';



const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ keyword, setKeyword ] = useState('')

    const handleSearchChange = (e) => {
        setKeyword(e.target.value)
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('SEARCHHHHHHHHH ------>>>>>>>',keyword);
        await dispatch(getSearchResults(keyword.toLowerCase()));
        history.push(`/search/${keyword}`);

        setKeyword('')
    }


    return (
        <>
            <form className='search_form'>
                {/* <input
                    type="text"
                    className='search_input'
                    placeholder='what do you wanna know...'
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                /> */}
            <SearchIcon style={{ marginTop: '20px', marginLeft:'20px', color:'blue' }}/>
            <TextField label='Search Posts' variant='standard' style={{color:'blue'}}
                onChange={handleSearchChange}
            />
            <button style={{display:'none'}} className='search-btn' onClick={handleSubmit}>search</button>
        </form>
        </>
    )
}

export default SearchBar;
