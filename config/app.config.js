require('dotenv').config();
switch (process.env.ENVIRONMENT){
    case 'DEV':
        require('custom-env').env('dev');
        break;
    case  'RECETTE' :
        require('custom-env').env('recette');
        break;
    case 'PREPROD':
        require('custom-env').env('preprod');
        break;
    default : process.exit(1)
}

