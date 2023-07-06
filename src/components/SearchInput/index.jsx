import './styles.css'

export const SearchInput = ({ searchValue, handleChangeInput }) => (
        <div className='container-input'>
          <input 
            type="search" 
            name="campo de pesquisa"
            onChange={handleChangeInput} 
            value={searchValue}
            className='input-search'
            placeholder='Look for your article'
            id="" 
          />
        </div>
    );
