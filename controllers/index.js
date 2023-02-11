const easyinvoice=require('easyinvoice')
const fs=require('fs');
const path = require('path');

class Helper{
    static resHelper = (res, statusCode, apiStatus, data, message)=>{
        res.status(statusCode).send({
            apiStatus,
            data, 
            message
        })
    }

    static convetToBase64=(imgPath)=>{
        const png=fs.readFileSync(imgPath)
        return new Buffer.from(png).toString('base64')
    }

    static templet =(user,employee,order,unit) => {
        const imgPath=path.resolve('public',"images","logo.jpg")
        let data=[]
        // Customize enables you to provide your own templates
        // Please review the documentation for instructions and examples
        return data={
            "customize": {
                //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
            },
            "images": {
                // The logo on top of your invoice
                "logo": `${this.convetToBase64(imgPath)}`,
                // The invoice background
                // "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
            },
            // Your own data
            "sender": {
                "company": "Ebny",
                "address": "Domyate 123",
                "zip": "1234 AB",
                "city": "New Domyate",
                "country": "Egypt"
                //"custom1": "custom value 1",
                //"custom2": "custom value 2",
                //"custom3": "custom value 3"
            },
            // Your recipient
            "client": {
                // customer id
                "company": `${user.fName + " " + user.lName}`,
                // customer email
                "address": `${user.email}`,
                // "phone": `${user.phone}`,
                "zip": `${user.gender}`,
                "phone": `${user.phone}`,
                "country": "Egypt",
            },
            "information": {
                // Invoice number
                "number": `${order._id}`,
                // Invoice data
                "date": `${new Date()}`,
                // Invoice due date
                "due-date": `${new Date()}`,
            },
            "employee":{
                // Invoice employee name
                "name":`${employee.name}`,
                "email":`${employee.email}`
            },
            // The products you would like to see on your invoice
            // Total values are being calculated automatically
            "products": [
                {
                    "quantity": 1,
                    "description": `${unit.description}`,
                    // Unit number
                    "unitNumber": `${unit.number}`,
                    "price": `${unit.price}`
                },
            ],
            // The message you would like to display on the bottom of your invoice
            "bottom-notice": "Hope to see you in our campany agnain.",
            // Settings to customize your invoice
            "settings": {
                "currency": "EGP", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
                // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
                // "tax-notation": "gst", // Defaults to 'vat'
                "margin-top": 10, // Defaults to '25'
                // "margin-right": 25, // Defaults to '25'
                // "margin-left": 25, // Defaults to '25'
                "margin-bottom": 0, // Defaults to '25'
                "format": "A5", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
                // "height": "100px", // allowed units: mm, cm, in, px
                // "width": "500px", // allowed units: mm, cm, in, px
                // "orientation": "landscape", // portrait or landscape, defaults to portrait
            },
            // Translate your invoice to your preferred language
            "translate": {
                "invoice": "Ebny",  // Default to 'INVOICE'
                // "gender": `${user.gender}`,
                // "number": "Nummer", // Defaults to 'Number'
                // "date": "Datum", // Default to 'Date'
                // "due-date": "Datum", // Defaults to 'Due Date'
                // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
                // "products": "Producten", // Defaults to 'Products'
                // "quantity": "Aantal", // Default to 'Quantity'
                // "price": "Prijs", // Defaults to 'Price'
                // "product-total": "Totaal", // Defaults to 'Total'
                // "total": "Totaal" // Defaults to 'Total'
                // "employee": "Employee",
                }
            }
    };

    //Create your invoice! Easy!
    static receiptPdf=async(user,employee,order,unit)=>{
        //The response will contain a pdf file name
        const template=this.templet(user,employee,order,unit)
        const receipt=await easyinvoice.createInvoice(template)
        const fileName=`receipt-${Date.now()}-ebny.pdf`
        fs.writeFileSync(`./public/receiptes/${fileName}`,receipt.pdf,'base64')
        return fileName
    }
}

module.exports=Helper