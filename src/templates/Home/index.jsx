import { Component } from 'react'

import './styles.css'

import { loadPosts } from '../../utils/Load-post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { SearchInput } from '../../components/SearchInput';

class Home extends Component {
   
      // O estado é os dados que o componente utiliza
      state = { 
        counter: 0,
        posts: [],
        allPosts: [],
        page: 0,
        postsPerPage: 10,
        searchValue: ''
      };
     
      // Esse lifecycle é utilizado quando o componente for montado
      // É nele que podemos fazer requisições para depois ser mostrado na tela
      async componentDidMount() {
        await this.loadPosts()
      }

    loadPosts = async () => {
        const { page, postsPerPage } = this.state;
        const postsAndPhotos = await loadPosts()

      this.setState({ 
        posts: postsAndPhotos.slice(page, postsPerPage),
        allPosts: postsAndPhotos
      })
    };

    loadMorePosts = () => {
      const { 
        page, 
        allPosts, 
        postsPerPage,
        posts
      } = this.state
        
      const nextPage = page + postsPerPage;

      const nextPosts = 
      allPosts.slice(nextPage, nextPage + postsPerPage)
      posts.push(...nextPosts)
      this.setState({ posts, page: nextPage })
        
    };
    
    handleChangeInput = (e) => {
      const { value } = e.target
      this.setState({ searchValue: value })
    };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filterPosts = !!searchValue ? 
     allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    : posts;
 
    return (
      <section className='container'>
          {!!searchValue && (
            <h2>Search value : {searchValue}</h2>
          )}  
          
          <SearchInput 
            handleChangeInput={this.handleChangeInput}
            searchValue={searchValue}
          />
      
          {filterPosts.length > 0 && ( 
           <Posts posts={filterPosts}/> 
          )}

          { filterPosts.length === 0 && (
            <p>Não encontrado  ;) </p>
          ) }
        <div className='container-button'>
          {!searchValue && (
            <Button 
            text="Load More Posts" 
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  };
};

export default Home
