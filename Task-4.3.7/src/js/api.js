export class Api {
  async loadRepos(searchValue){
    return await fetch(`https://api.github.com/search/repositories?q=${searchValue}&per_page=5`);
  }

}