import exp from "constants";
interface BookDetails{
    title:string;
    author:string;
    isBorrowed:boolean;
    pages?:number;
    fileSizeMB?:number;
    type?:string
}
export abstract class Book{
    protected title:string;
    protected author:string;
    protected isBorrowed:boolean;

    constructor(title:string,author:string){
        this.title=title;
        this.author=author;
        this.isBorrowed=false;
    }
    borrow():boolean{
        if(this.isBorrowed){
            return false
        }
        this.isBorrowed=true
        return true
    }
    returnBook():boolean{
        if(!this.isBorrowed){
            return false
        }this.isBorrowed=false
        return true
    }
    getDetails():BookDetails{
        return{
            title:this.title,
            author:this.author,
            isBorrowed:this.isBorrowed
        }
    }
}

export class EBook extends Book{
    private fileSizeMB:number;
    constructor(title:string,author:string,fileSizeMB:number){
        super(title,author);
        this.fileSizeMB=fileSizeMB
    }
    getDetails():BookDetails{
        return{
            ...super.getDetails(),type:"Ebook",fileSizeMB:this.fileSizeMB
        };
    }
}

export class PhysicalBook extends Book{
    private pages:number;

    constructor(title:string,author:string,pages:number){
        super(title,author)
        this.pages=pages
    }
    getDetails():BookDetails{
        return{
            ...super.getDetails(),type:"Physical",pages:this.pages
        }
    }
}