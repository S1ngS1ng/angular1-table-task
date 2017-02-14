import angular from 'angular'
import './app.css'
import TableData from './table-data/table-data'

let app = () => {
    return {
        template: require('./app.html'),
        controller: 'AppCtrl',
        controllerAs: 'app'
    }
}

class AppCtrl {
    constructor(TableData) {
        // Instantiate Service
        this._TableData = TableData

        // Define initial value
        this.tableData = {
            data: [],
            resolved: false
        }

        // Call the service to retrieve data
        this._TableData.get()
            .then(
                res => {
                    [this.tableData.data, this.tableData.resolved] = [res.data, true]
                    // Save all keys in keyArr, for sort mapping
                    this.tableData.keyArr = Object.keys(this.tableData.data[0])
                    // Convert to TitleCase, for template and sort mapping
                    this.titleKeyArr = this.tableData.keyArr.map(e => e[0].toUpperCase() + e.slice(1))
                    // Set a key flag for sorting, the initial value of all flag should be false
                    this.titleKeyFlag = this.titleKeyArr.reduce((prev, next) => {
                        prev[next] = false
                        return prev
                    }, {})
                },
                err => [this.tableData.data, this.tableData.resolved, this.tableData.state] = [err.statusText, true, 'fail']
            )
    }

    sortColumn(param) {
        let originKey = this.tableData.keyArr[this.titleKeyArr.indexOf(param)]
        let order = this.titleKeyFlag[param];
        let result = this.tableData.data.sort((previous, next) => {
            let x = previous[originKey];
            let y = next[originKey];
            if (order) {
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            } else {
                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            }
        });
        this.titleKeyFlag[param] = !this.titleKeyFlag[param];
        return result;
    }

}

const MODULE_NAME = 'app'

angular.module(MODULE_NAME, [])
    .directive('app', app)
    .controller('AppCtrl', AppCtrl)
    .service('TableData', TableData)

export default MODULE_NAME
