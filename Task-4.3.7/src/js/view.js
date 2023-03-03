export class View {
  constructor(api) {
    this.app = document.getElementById('app');
    this.api = api;

    this.searchLine = this.createElement('div', 'search');
    this.searchInput = this.createElement('input', 'search__input');
    this.searchLine.append(this.searchInput);

    this.reposWrapper = this.createElement('div', 'repos');
    this.reposList = this.createElement('ul', 'repos__list');
    this.reposWrapper.append(this.reposList);

    this.app.append(this.searchLine);
    this.app.append(this.reposWrapper);
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    element.classList.add(elementClass);
    return element;
  }

  createRepos(userData) {
    const owner = userData.owner.login;
    const stars = userData.stargazers_count;
    const reposElement = this.createElement('li', 'repos__item');
    reposElement.insertAdjacentHTML('beforeend', `<span class = "repos__name">${userData.name}</span>`);

    reposElement.addEventListener('click', () => {
      this.searchInput.value = '';
      this.reposList.innerHTML = '';
      this.showReposData(userData.name, owner, stars);
    });

    this.reposList.append(reposElement);
  }

  showReposData(repName, owner, stars) {
    const reposInfo = this.createElement('div', 'repos-info');

    reposInfo.insertAdjacentHTML('beforeend', `<span class = "repos-info__name">Name: ${repName}</span>
                                               <span class = "repos-info__owner">Owner: ${owner}</span>
                                               <span class = "repos-info__stars">Stars: ${stars}</span>
                                               <button class = "repos-info__btn"></button>`);

    reposInfo.addEventListener('click', (event) => {
      if(event.srcElement.className != "repos-info__btn") return;
      reposInfo.remove();
    });

    this.app.append(reposInfo);
  }
}