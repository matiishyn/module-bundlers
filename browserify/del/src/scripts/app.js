import angular from 'angular';
import HomeController from './controllers/HomeCtrl';
import NameService from './services/PersonService';
import {UpperFilter, LowerFilter} from './filters/textFilters';

angular.module('myApp', [])
	.controller('HomeController', HomeController)
	.filter('upper', UpperFilter)
	.filter('lower', LowerFilter)
	.service('PersonService', NameService);
