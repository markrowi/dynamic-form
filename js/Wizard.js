function Wizard(wz){
    this.name = wz.name; 
    this.fields = wz.fields;
}

Wizard.prototype.render = function render (btn) {
    $content = $(`<div class="container-fluid wizard" data-wizard=${this.name}>
                <div class="row actions action-top"></div>
                <div class="row form-content"><h1>${this.name}</h1></div>
                <div class="row actions action-bottom"></div>
            </div>`)


    $.each(btn.top, function(i, btn){
        $content.find('.action-top').append(actionTemplate(btn))
    })
    $.each(btn.bottom, function(i, btn){
        $content.find('.action-bottom').append(actionTemplate(btn))
    })

    var form = new Form(this.fields);

    $content.find('.form-content').append(form.render())

    return $content;
}

function actionTemplate(btn){
    return `<div class="col-md-12">
            <input type="button" name="" data-action="${btn.action}" class="btn btn-primary form-control" id="" value="${btn.label}">
        </div>`
}

