---
name: academicpages-add-publication
description: Use when adding a paper to this Academic Pages Astro site from an arXiv ID or URL, a DOI, a BibTeX entry, or a publisher page link
---

# Academic Pages Astro Add Publication Skill 📄

Turns a paper identifier into a complete entry in `src/content/publications/`

> 📚 **Canonical Reference**: Publication fields and an example entry are in [`docs/CONTENT.md#3-publications-srccontentpublications`](../../../docs/CONTENT.md#3-publications-srccontentpublications). Match the style of the existing files in `src/content/publications/`

---

## 1. Check for Duplicates

Search `src/content/publications/` for the DOI, arXiv ID and title. If the paper is already there, update that file instead of creating a new one (e.g. a preprint that is now published)

## 2. Fetch Metadata

| Input   | Metadata                                                                                      | BibTeX                                                             |
| :------ | :-------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| arXiv   | `curl -s "https://export.arxiv.org/api/query?id_list=<id>"` (title, authors, date, abstract)  | `curl -s https://arxiv.org/bibtex/<id>`                            |
| DOI     | `curl -sL -H "Accept: application/vnd.citationstyles.csl+json" https://doi.org/<doi>`         | `curl -sL -H "Accept: application/x-bibtex" https://doi.org/<doi>` |
| BibTeX  | Read the fields from the entry; look up its `doi` or `eprint` field as above for the abstract | Use as given                                                       |
| Web URL | Find the DOI or arXiv ID on the page, then use the matching row                               | —                                                                  |

If an arXiv paper has a published version (`<arxiv:doi>` or `<arxiv:journal_ref>` in the response), use the published venue and date and keep the arXiv link. If the network is unavailable, ask the user to paste the BibTeX entry

## 3. Write the Entry

Create `src/content/publications/<short-title-slug>.md`:

- **`title`**: Paper title; wrap any math in `$...$`
- **`date`**: Publication date as `YYYY-MM-DD`; use `01` for an unknown month or day
- **`description`**: One sentence summarizing the abstract
- **`category`**: Must be a key of `publicationCategories` in `src/data/siteConfig.ts` or the build fails. Map journal articles to the journals key, proceedings to the conferences key, books to the books key; for preprints or anything else, ask the user or add a new category there
- **`venue`**: Full journal or conference name, without the year
- **`citation`**: Formatted the same way as the existing entries
- **`pdf_url`**: Local file under `/files/` if the user supplied one, otherwise the arXiv PDF (`https://arxiv.org/pdf/<id>`) or an open-access PDF
- **`paper_url`**: `https://doi.org/<doi>`, or the arXiv abstract page when there is no DOI
- **`code_url`** and **`slides_url`**: Only when known; check the abstract and paper page for a repository link
- **`bibtex`**: The fetched entry as a `|` block with two-space indentation; omit `abstract`, `file` and `keywords` fields
- **Body**: The abstract

Omit any optional field you could not find. Never invent a venue, date, DOI or URL

## 4. Verify

```bash
pnpm verify
pnpm build
```
