"use strict";

var rules = [{
    name: 'isFeito',
    validate: '$data.feito == true'
}];

var selection = [
];

var interface_abstracts = [
    {
        name:'landing',
        widgets : [
            {'container':[
                {'head': 'title'},
                {'content': [
                 { 'form_tarefa': 'input_tarefa'},
                 {name: 'items',
                  datasource:'todo_list',
                  children:[
                    {'item':
                        {'tipo': [
                            {name:'feito', bind:'$data.feito'},
                            {name:'tarefa', bind:'$data.tarefa'}
                         ]
                        }
                    }
                  ]
                 }]
                }
            ]}
        ]
    }
];

var GeralHead = [
    {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
    {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
    {name: 'title', widget:'Title', value: '"Todo List"'}
];

var concrete_interface = [
    {
        name: 'landing',
        head: GeralHead,
        maps: [

        { name: 'container', class:'container' },
        { name: 'head', class:'jumbotron' },
        { name: 'title', tag:'h1', text:'center', value:'"Tarefas"' },

        { name: 'content',  class:'row', md:'6,offset-3' },
        { name: 'form_tarefa', form:'group'},
        { name: 'input_tarefa', tag:'input', type:'text', events:{ keydown:'adicionar' }, form:'control', placeholder:'Descrição da Tarefa'},

        { name: 'items' },
        { name: 'item', class:"row", events:{ click: 'marcar' } },
        { name: 'tipo', alert:"warning" },
        { name: 'tipo', alert:"info", when:'isFeito'},
        { name: 'feito', tag:'input', pull:'left', type:'checkbox' },
        { name: 'feito', tag:'input', pull:'left', type:'checkbox', checked:'true', when:'isFeito' },
        { name: 'tarefa', tag:'h3', value:'$bind' }
    ]}
];

var ajaxSetup = {

};

if(typeof define === 'function') {
    define([
        "jquery",
        "bootstrap",
        'mira/init'
    ], function ($, $bootstrap, Mira) {

        return function Imovel() {
            var app = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
            Mira.Widget.setDefault('BootstrapSimple');

            window.todo_list = new Mira.Api.Collection([{
                tarefa: 'Programar em JS',
                feito: true
            },{
                tarefa: 'Ir a PUC',
                feito: false
            }]);

            window.marcar = function(options){
                options.$dataObj.set('feito', !options.$dataObj.get('feito'))
            };

            window.adicionar = function(options){
                if(options.$event.keyCode == 13 && options.$event.target.value) {
                    window.todo_list.add({
                        tarefa: options.$event.target.value,
                        feito: false
                    });
                    options.$dataObj.trigger('change');
                }
            };
        };

    });
} else {

    exports.ajaxSetup = ajaxSetup;
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.selection = selection;
    exports.rules = rules;
}


