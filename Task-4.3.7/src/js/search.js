export class Search {
  constructor(view, api) {
    this.view = view;
    this.api = api;

    this.view.searchInput.addEventListener('keyup', this.debounce(this.searchRepos.bind(this), 500));
  }

  searchRepos() {
    const searchValue = this.view.searchInput.value;
    const pattern = /^[\s]+$/;

    if (searchValue && !pattern.test(searchValue)) {
      this.clearRepos();
      this.reposRequest(searchValue);
    } else {
      this.clearRepos();
    }
  }

  async reposRequest(searchValue) {
    try {
      await this.api.loadRepos(searchValue).then((res) => {
        res.json().then((res) => {
          if(res.items.length == 0) {
            this.view.reposList.insertAdjacentHTML('beforeend', '<span class = "repos__message"> Такого репозитория не существует </span>');
          }
          res.items.forEach(user => this.view.createRepos(user));
        });
      });
    } catch (error) {
      console.log('Error:' + error);
    }
  }

  clearRepos() {
    this.view.reposList.innerHTML = '';
  }

  debounce(func, wait, immediate) {
    let timeout;

    return function () {
      const context = this, args = arguments;

      const later = function () {
        timeout = null;

        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  }
}