var app = angular.module('app', ['ngAnimate', 'toaster', 'ui.bootstrap', 'ui.router', 'NavigationBar', 'Utils']);

app.run(function (AuthFactory) {
    AuthFactory.checkAccess();
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('about', {
            url: '/',
            templateUrl: 'templates/about_content.html',
            controller: 'AboutController'
        })
        .state('tasks', {
            url: '/tasks',
            templateUrl: 'templates/tasks.html',
            controller: 'TasksController'
        });
});

app.controller('AboutController', function ($scope) {
    $scope.title = 'Labor Exchange test project';
    $scope.subTitle = 'Service which helps you to find a performer for your tasks';
});

app.controller('TasksController', function ($scope, $rootScope, $modal, RequestFactory, toaster, USER_TYPES) {
    $scope.title = 'Labor Exchange test project';
    $scope.subTitle = 'Service which helps you to find a performer for your tasks';

    $scope.user = $rootScope.user;

    $scope.$watch(
        function() {
            return $rootScope.user;
        },
        function(newVal) {
            $scope.user = newVal;
        }
    );

    $scope.USER_TYPES_CONST = USER_TYPES;

    $scope.tasks = {};

    RequestFactory.getTasks()
        .success(function (data) {
            $scope.tasks = data;
        });

    $scope.addTask = function () {
        var modalInstance = $modal.open({
            templateUrl: 'templates/modal/add_task.html',
            controller: 'ModalAddTaskController',
            size: 'sm'
        });
        modalInstance.result.then(
            function (data) {
                $scope.tasks.unshift(data);
                toaster.success("Task added", "Your task has been completely added");
            });
    }


});

