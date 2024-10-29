export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
  // Process columns metadata
  const columnsMeta = section.querySelector('div.columns-metadata');
  if (columnsMeta) {
    const meta = readBlockConfig(columnsMeta);
    Object.keys(meta).forEach((key) => {
      if (key === 'style') {
        const styles = meta.style
          .split(',')
          .filter((style) => style)
          .map((style) => toClassName(style.trim()));
        styles.forEach((style) => section.classList.add(style));
      } else {
        section.dataset[toCamelCase(key)] = meta[key];
      }
    });
    columnsMeta.parentNode.remove();
  }
}
