/* This file is part of nginx-fancyindex-flat-theme.
 *
 * nginx-fancyindex-flat-theme is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or (at your
 * option) any later version.
 *
 * nginx-fancyindex-flat-theme is distributed in the hope that it will be
 * useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
 * Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see
 *
 *  http://www.gnu.org/licenses/
 *
 *
 * Copyright (C)
 *  2018 Alexander Haase <ahaase@alexhaase.de>
 */

/**
 * Apply the styling of the directory listing table.
 *
 * The default directory listing table can be styled only basically via CSS.
 * This function will apply additional styles to it and adds an extra column for
 * icons.
 */
function styleList()
{
  /**
   * Get the font awesome icon to be used for a specific file.
   *
   *
   * @param string filename the filename to be checked
   *
   * @return string the HTML icon tag to be used
   */
  function getIcon(filename)
  {
    /**
     * Get the font awesome class of the icon to be used.
     *
     *
     * @param string filename the filename to be checked
     *
     * @return string the icon class to be used
     */
    function getFontAwesomeClass(filename)
    {
      /* If the file is a directory (i.e. has a trailing slash), return the
       * folder icon without further checking. */
      if (filename.endsWith('/'))
        return 'fa-folder';

      /* For all other kinds of files, check the file extension and select an
       * icon based on this extension. */
      switch (filename.split('.').pop())
        {
        case 'txt':
          return 'fa-file-text-o';

        case 'pdf':
          return 'fa-file-pdf-o';

        case 'bmp':
        case 'gif':
        case 'jpeg':
        case 'jpg':
        case 'png':
        case 'tif':
        case 'tiff':
          return 'fa-file-image-o';

        case 'aac':
        case 'aiff':
        case 'm4a':
        case 'mp3':
        case 'ogg':
        case 'opus':
        case 'wav':
          return 'fa-file-audio-o';

        case 'amv':
        case 'avi':
        case 'flv':
        case 'm4v':
        case 'mkv':
        case 'mov':
        case 'mp4':
        case 'm4p':
        case 'mpeg':
        case 'mpg':
        case 'ogv':
        case 'vob':
        case 'webm':
        case 'wmv':
          return 'fa-file-video-o';

        case '7z':
        case 'a':
        case 'apk':
        case 'ar':
        case 'bin':
        case 'bz2':
        case 'cab':
        case 'dmg':
        case 'gz':
        case 'iso':
        case 'jar':
        case 'lz':
        case 'lzma':
        case 'lzo':
        case 'pak':
        case 'partimg':
        case 'rar':
        case 's7z':
        case 'tar':
        case 'tbz2':
        case 'tgz':
        case 'tlz':
        case 'txz':
        case 'xz':
        case 'zip':
          return 'fa-file-archive-o';

        case 'doc':
        case 'docx':
        case 'odt':
        case 'rtf':
          return 'fa-file-word-o';

        case 'csv':
        case 'ods':
        case 'xls':
        case 'xlsx':
          return 'fa-file-excel-o';

        case 'odp':
        case 'ppt':
        case 'pptx':
          return 'fa-file-powerpoint-o';

        case 'c':
        case 'class':
        case 'cpp':
        case 'cs':
        case 'h':
        case 'hpp':
        case 'hxx':
        case 'java':
        case 'py':
        case 'sh':
        case 'swift':
        case 'vb':
          return 'fa-file-code-o';

        /* If none of the previous types matched, use a generic file icon. */
        default:
          return 'fa-file-o';
        }
    }

    /* Return the file icon HTML tag to be used for the file passed to this
     * function. */
    return '<i class="fa fa-fw ' + getFontAwesomeClass(filename) +
           '" aria-hidden="true"></i>';
  }

  var list = document.getElementById("list");

  /* Remove the default style attributes and add the bootstrap table classes. By
   * default, text will be not wrapped. However, long filenames will be, as they
   * use the 'filename' class (see below). */
  list.removeAttribute("cellpadding");
  list.removeAttribute("cellspacing");
  list.classList.add('table', 'table-sm', 'table-hover', 'text-nowrap');

  /* As file size and last-modified date will be hidden at mobile devices, also
   * hide the the table header for mobile devices, as it's unneccessary for the
   * single remaining cell containig the filename. */
  list.tHead.children[0].classList.add('d-none', 'd-md-table-row');

  /* If we're in a subdirectory, remove the 'Parent Directory' row, as the
   * navigation is covered by the breadcrumbs. */
  if (window.location.pathname != '/')
    list.deleteRow(1);

  /* Iterate over all rows (including the thead) to add individual classes for
   * each cell or adding new cells. */
  for (var i = 0, row; row = list.rows[i]; i++)
    {
      /* Add a new cell for the file-type icon. */
      row.insertCell(0).innerHTML =
        (i > 0) ? getIcon(row.cells[1].children[0].innerHTML) : '';

      /* Set the classes for all cells. All cells except the filename will fit
       * their contents. The filename cell is the only allowed to wrap. The last
       * two cells (file size and last-modified date) will be hidden on small
       * (i.e. mobile) devices.*/
      row.cells[0].classList.add('col-auto');
      row.cells[1].classList.add('col', 'filename');
      row.cells[2].classList.add('col-auto', 'd-none', 'd-md-table-cell');
      row.cells[3].classList.add('col-auto', 'd-none', 'd-md-table-cell');
    }
}