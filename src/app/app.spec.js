import app from './app';

describe('app', () => {

    describe('AppCtrl', () => {
        let ctrl;

        beforeEach(() => {
            angular.mock.module(app);

            angular.mock.inject(($controller) => {
                ctrl = $controller('AppCtrl', {});
            });
        });

        describe('tableData Object', () => {
            it('should bind tableData attribute', () => {
                expect(ctrl.tableData).toBeDefined();
            });

            it('should initialize tableData with correct property', () => {
                expect(ctrl.tableData.data).toBeDefined();
                expect(ctrl.tableData.resolved).toBeDefined();
            });

            it('should initialize tableData with correct value', () => {
                expect(ctrl.tableData.data).toEqual([]);
                expect(ctrl.tableData.resolved).toEqual(false);
            })
        });

        describe('TableData service', () => {
            it('should bind _TableData attribute', () => {
                expect(ctrl._TableData).toBeDefined();
            });

            it('should have get method', () => {
                inject(TableData => {
                    expect(TableData.get()).toBeDefined()
                })
            });
        });
    });
});
