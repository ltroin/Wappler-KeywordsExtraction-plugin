const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");



exports.extractkeywords = async function (options) {

    options = this.parse(options);
    console.log(options);
    const textAnalyticsClient = new TextAnalyticsClient(options.endpoint, new AzureKeyCredential(options.key));

    async function keyPhraseExtraction(client) {

        const keyPhrasesInput = [
            options.sentence,
        ];
        const keyPhraseResult = await client.extractKeyPhrases(keyPhrasesInput);
        let tempArray = [];
        keyPhraseResult.forEach(document => {
            console.log(`ID: ${document.id}`);
            console.log(`\tDocument Key Phrases: ${document.keyPhrases}`);
            tempArray = document.keyPhrases;
        });
        return tempArray;
    }
    var temp = await keyPhraseExtraction(textAnalyticsClient);
    // var res = temp.split(",");
    var res = temp.join(' ');

    return { keywords: res };

}
