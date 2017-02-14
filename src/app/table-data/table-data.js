export default class TableData {
    constructor($http) {
        this._$http = $http
    }

    get() {
        return this._$http({
            url: 'http://jsonplaceholder.typicode.com/posts',
            method: 'GET'
        }).then(res => {
            this.data = res;
            return res;
        });
    }
}
