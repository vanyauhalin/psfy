import fs from 'fs';
import postcss from 'postcss';
import postcssCsso from 'postcss-csso';
import postcssImport from 'postcss-import';

postcss()
  .use(postcssCsso())
  .use(postcssImport())
  .process(fs.readFileSync('src/main.css'), {
    from: 'src/main.css',
  })
  .then((result) => {
    fs.writeFileSync('lib/user.css', result.css);
    fs.copyFileSync('src/color.ini', 'lib/color.ini');
  });
