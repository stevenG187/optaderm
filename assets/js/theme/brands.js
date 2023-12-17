import CatalogPage from './catalog';
import artisanLoaded from './artisan/brands';

export default class Brands extends CatalogPage {
    onReady() {
        artisanLoaded();
    }
}
