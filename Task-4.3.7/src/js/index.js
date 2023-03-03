import '../scss/style.scss';

import { Search } from './search';
import { View } from './view';
import { Api } from './api';

const api = new Api()

new Search(new View(api), api);
