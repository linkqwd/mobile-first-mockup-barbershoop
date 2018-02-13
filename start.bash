#!/bin/bash
sm=$1
bt=$2

function addfeatures () {
	if [[ $sm == "sg" ]]
		then
			echo "installing smartgrid"
			smt='"smart-grid": "^2.0.1",'
			sed -i "18 a $smt" package.json
			sed -i "1 a @import 'smart-grid.scss';" src/sass/styles.scss
			echo "var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
    outputStyle: 'less', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '560px'
        }
        /* 
        We can create any quantity of break points.
 
        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};

smartgrid('src/sass/', settings);" > smartgrid.js

		else 
			echo false
		fi
}

#########

if [ $1 ]; 
	then
  	addfeatures
	else
	  echo "no parameters are provided, no additional features will be installed"
fi

if [[ -e ./src/libs ]]
	then
		echo "папка есть"
	else
		mkdir ./src/libs/
fi

if [[ -e ./src/sass ]]
	then
		echo "папка есть"
	else
		mkdir ./src/sass/
fi

if [[ -e ./src/img ]]
	then
		echo "папка есть"
	else
		mkdir ./src/img/
fi

if [[ -e ./src/fonts ]]
	then
		echo "папка есть"
	else
		mkdir ./src/fonts/
fi

if [[ -e ./src/css ]]
	then
		echo "папка есть"
	else
		mkdir ./src/css/
fi

#########

npm i
npm up

bower i jquery

rm -f package-lock.json

gulp watch