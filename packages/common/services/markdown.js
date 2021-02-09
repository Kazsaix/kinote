import marked from 'marked';
import { secondsToTime, buildAutoSeekUrl } from '../utils';
import { INSTALLATION_URL } from '../constants';

class Markdown {
  static toText(markdownContent) {
    const div = document.createElement('div');
    div.innerHTML = marked(markdownContent);
    return div.innerText;
  }

  static toHTML(markdownContent) {
    return marked(markdownContent);
  }

  static pagesToMarkdown(pages) {
    let data = `<!-- ${browser.i18n.getMessage(
      'services_template_signature',
      `<a href="${INSTALLATION_URL}">YiNote</a>`
    )} -->\n\n`;

    for (let page of pages) {
      const { meta, notes } = page;
      data += `Link: ${meta.url}\n`;
      data += `Title: ${meta.title}\n`;

      data += `Topics: `;
      for (let keyword of meta.keywords) {
        data += ` [[${keyword}]] `;
      }
      data += `\n`;
      data += `Type: #video\n\n`;
      data += `###\n`;

      for (let note of notes) {
        data += `<a href="${buildAutoSeekUrl(meta.url, note.timestamp)}">\n`;
        data += `<img src="${note.image}"></img></a>\n\n`;
        data += note.content + '\n\n';
      }
    }

    return data;
  }
}

export default Markdown;
