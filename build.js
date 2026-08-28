const fs = require('fs');

const data = [
  {
    family: "Structure",
    types: [
      {
        name: "Main Conclusion",
        task: "Identify the final conclusion that the rest of the argument is built to support.",
        stems: ["Which one of the following most accurately expresses the main conclusion of the argument?", "The main point of the argument is that"],
        method: "Find the support chain. Ask 'Why?'. If another claim supports it, it's a conclusion. If it supports nothing else, it's the main conclusion. (The Why Test)",
        trap: "Intermediate Conclusions. A claim that is supported by evidence but also goes on to support the final conclusion."
      },
      {
        name: "Argument Part",
        task: "Describe the specific function a particular phrase or sentence serves in the argument.",
        stems: ["The claim that X plays which one of the following roles in the argument?", "The statement that X functions in the argument as"],
        method: "Ask: 'Does it support something?' and 'Is it supported by something?'. Focus on the structural function, not the subject matter.",
        trap: "Content vs. Function. Wrong answers often accurately describe the content but misidentify the role (e.g., calling evidence a conclusion)."
      }
    ]
  },
  {
    family: "Patterns & Flaws",
    types: [
      {
        name: "Method of Reasoning",
        task: "Describe the logical technique or strategy the author uses to build their argument.",
        stems: ["The argument proceeds by", "Which one of the following describes the technique of reasoning used?"],
        method: "Abstract the argument into general terms. Identify the premises, conclusion, and how they relate. Match your abstraction to the answer choices.",
        trap: "Half-Right Answers. An answer might correctly describe one part of the argument but completely misrepresent another."
      },
      {
        name: "Parallel Reasoning",
        task: "Find the answer choice that uses the exact same logical structure as the stimulus.",
        stems: ["Which one of the following arguments is most similar in its reasoning to the argument above?", "The pattern of reasoning in the argument is most closely paralleled by"],
        method: "Match the conclusion type (absolute vs. conditional), premise structure, and validity. Strip away the topic.",
        trap: "Same Topic, Different Logic. Wrong answers often use the exact same subject matter but completely different logical relationships."
      },
      {
        name: "Flaw",
        task: "Identify the specific reasoning error committed in the argument.",
        stems: ["The reasoning in the argument is most vulnerable to criticism on the grounds that", "The argument's reasoning is questionable because it fails to consider that"],
        method: "Play Devil's Advocate: Ask 'How could the evidence be perfectly true while the conclusion is still completely wrong?'",
        trap: "Describing a Flaw Not Committed. The answer describes a real logical fallacy, but not the one that actually occurred in this argument."
      },
      {
        name: "Parallel Flaw",
        task: "Find the answer choice that commits the exact same logical error as the stimulus.",
        stems: ["The flawed pattern of reasoning in the argument is most similar to that in which one of the following?"],
        method: "Identify the specific flaw (e.g., conditional logic error, part-to-whole). Match only that specific structural error in the choices.",
        trap: "Matching Valid Logic. An answer choice that has the same conclusion type but is actually a valid argument."
      }
    ]
  },
  {
    family: "Argument Impact & Assumptions",
    types: [
      {
        name: "Evaluate",
        task: "Identify the question or piece of information that would be most helpful in determining if the argument is strong.",
        stems: ["Which one of the following would it be most helpful to know in order to evaluate the argument?", "The answer to which one of the following questions is most relevant to evaluating the conclusion?"],
        method: "Use the Variance Test: Supply opposing extremes (e.g., Yes/No, 0%/100%). If one strengthens and the other weakens, it's the right answer.",
        trap: "Irrelevant Context. A question that might be interesting but whose answer doesn't change the validity of the conclusion."
      },
      {
        name: "Strengthen",
        task: "Find the new piece of information that makes the conclusion more likely to be true.",
        stems: ["Which one of the following, if true, most strengthens the argument?", "Which one of the following, if true, provides the most support for the conclusion?"],
        method: "Identify the conclusion and the evidence. Find the gap. Look for an answer that patches the gap or blocks a potential counterattack.",
        trap: "Justifying a Premise. An answer that strengthens a premise that is already accepted as true, rather than strengthening the link to the conclusion."
      },
      {
        name: "Weaken",
        task: "Find the new piece of information that makes the conclusion less likely to be true.",
        stems: ["Which one of the following, if true, most weakens the argument?", "Which one of the following, if true, most undermines the conclusion?"],
        method: "Identify the core argument. Find the gap or assumption. Attack that gap with new evidence that shows why the conclusion doesn't have to follow.",
        trap: "Attacking a Premise. You cannot argue with the premises on the LSAT; you can only show they don't necessitate the conclusion."
      },
      {
        name: "Sufficient Assumption",
        task: "Find the missing premise that, if added, guarantees the conclusion is 100% true.",
        stems: ["The conclusion follows logically if which one of the following is assumed?", "Which one of the following, if assumed, allows the conclusion to be properly drawn?"],
        method: "Look for Dangling Terms (a new concept in the conclusion). Find the Gap (Entry, Middle, End). Insert the answer and rerun the chain.",
        trap: "Necessary but not Sufficient. An assumption that must be true for the argument to work, but isn't enough on its own to prove the conclusion."
      },
      {
        name: "Necessary Assumption",
        task: "Find a premise that the argument requires or depends upon to work.",
        stems: ["Which one of the following is an assumption required by the argument?", "The argument depends on assuming which one of the following?"],
        method: "Use the Negation Test. Logically negate the answer choice. If the negated version destroys the argument, it is the correct necessary assumption.",
        trap: "Sufficient but not Necessary. An answer that would fix the argument perfectly, but goes too far (extreme language) and isn't strictly required."
      }
    ]
  },
  {
    family: "Principles",
    types: [
      {
        name: "Principle Strengthen",
        task: "Find a broad rule that, if applied, helps justify the specific reasoning in the stimulus.",
        stems: ["Which one of the following principles, if valid, most helps to justify the reasoning?", "The reasoning above most closely conforms to which one of the following principles?"],
        method: "Identify the specific leap made in the argument. Find a generalized rule that bridges that exact gap.",
        trap: "Rule is Too Narrow. A rule that applies to the specific topic but doesn't cover the logical jump made."
      },
      {
        name: "Principle Generalize",
        task: "Extract the underlying general rule from a specific scenario or argument.",
        stems: ["Which one of the following generalizations is most clearly illustrated by the situation described?", "The situation described above best illustrates which one of the following propositions?"],
        method: "Summarize the lesson or moral of the story. Strip away the specific characters and items.",
        trap: "Overly Specific Rules. Answers that retain too many details from the original stimulus rather than generalizing."
      },
      {
        name: "Principle Apply",
        task: "Take a broad rule and apply it to a new specific situation to see which one fits.",
        stems: ["Which one of the following judgments most closely conforms to the principle stated above?", "The principle stated above, if valid, most helps to justify which one of the following actions?"],
        method: "Convert the rule into a strict checklist (sufficient/necessary conditions). One missed necessary condition can eliminate an answer.",
        trap: "Reversed Logic. An answer that affirms the consequent or denies the antecedent of the given principle."
      }
    ]
  },
  {
    family: "Inference",
    types: [
      {
        name: "Most Strongly Supported",
        task: "Find the statement that is best proven by the combination of facts in the stimulus.",
        stems: ["Which one of the following is most strongly supported by the information above?", "The statements above, if true, most strongly support which one of the following?"],
        method: "Combine facts. Look for overlaps. The correct answer doesn't have to be 100% proven, but it should be very close based only on the text.",
        trap: "Real-World Truths. Statements that are true in the real world but not supported by the specific text provided."
      },
      {
        name: "Fill in the Blank",
        task: "Complete the logical thought at the end of the stimulus, usually a conclusion.",
        stems: ["Which one of the following most logically completes the argument?", "...therefore, it must be that ______"],
        method: "Treat it like a Must Be True or Main Conclusion question depending on the preceding context. Synthesize what was just said.",
        trap: "New Directions. An answer that brings up a new, albeit related, point rather than concluding the current line of thought."
      },
      {
        name: "Must Be True",
        task: "Find the statement that is 100% guaranteed by the facts in the stimulus.",
        stems: ["If the statements above are true, which one of the following must also be true?", "Which one of the following can be properly inferred from the passage?"],
        method: "Ask: 'Could this possibly be false without contradicting the stimulus?'. Combine absolute statements and conditional chains.",
        trap: "Exaggeration. Words like 'all', 'never', 'must', when the stimulus only supported 'some', 'rarely', 'might'."
      },
      {
        name: "Must Be False",
        task: "Find the statement that completely contradicts the facts in the stimulus.",
        stems: ["If the statements above are true, which one of the following must be false?", "Which one of the following is incompatible with the information above?"],
        method: "Use the Coexistence Test. Can this statement and the stimulus both be true at the same time? If no, it's the answer.",
        trap: "Could Be False. Statements that might not be true, but aren't strictly proven false by the stimulus."
      }
    ]
  },
  {
    family: "Paradox / Explain",
    types: [
      {
        name: "Paradox / Explain",
        task: "Find the piece of information that resolves a seeming contradiction between two facts.",
        stems: ["Which one of the following, if true, most helps to resolve the apparent discrepancy?", "Which one of the following, if true, does most to explain the surprising result?"],
        method: "Identify both surprising facts. Preserve both facts as true. Find the hidden distinction, bridge, or alternate cause that allows both to coexist.",
        trap: "Explaining Only One Side. An answer that explains why one fact is true, but makes the other fact even more confusing."
      }
    ]
  },
  {
    family: "Dialogue",
    types: [
      {
        name: "Disagree",
        task: "Identify the exact point of contention between two speakers.",
        stems: ["The dialogue provides the most support for the claim that X and Y disagree over whether", "X and Y's statements commit them to disagreeing about"],
        method: "Speaker-by-Speaker Commitment Test. Would Speaker A say 'Yes' or 'No'? Would Speaker B say the opposite? If one speaker has no opinion, it's wrong.",
        trap: "Agreeing to Disagree. An issue that both speakers mention, but actually agree on, even if they disagree on the broader conclusion."
      },
      {
        name: "Agree",
        task: "Identify a statement that both speakers are committed to believing.",
        stems: ["The dialogue provides the most support for the claim that X and Y agree that", "Which one of the following is a point on which X and Y agree?"],
        method: "Speaker-by-Speaker Commitment Test. Would Speaker A say 'Yes'? Would Speaker B also say 'Yes'?",
        trap: "Unstated Opinions. A statement that one speaker clearly agrees with, but the other speaker's stance is completely unknown."
      }
    ]
  }
];

module.exports = data;

const HTML_SCAFFOLD = (title, content, className = '') => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LR Question Type Map — ${title}</title>
<style>
  :root {
    --denim: #344E73;
    --slate: #425C81;
    --haze: #556E91;
    --gold: #C9A149;
    --ochre: #9F7633;
    --petal: #7F501D;
    --soft-white: #F8F9F9;
    --canvas: #F7F8FA;
    --deep-ink: #0A1625;
    --body-ink: #26313F;
    --line: #DDE3EA;
    --paper: #FFFFFF;
    --page-w: 10in;
    --page-h: 8in;
    --safe-x: 0.68in;
    --safe-y: 0.56in;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #E8EDF2; color: var(--body-ink); font-family: "Inter", Helvetica, Arial, sans-serif; }
  h1, h2, h3, h4 { color: var(--deep-ink); font-family: "Fraunces", Georgia, serif; margin:0;}
  .eyebrow { color: var(--ochre); font: 700 9pt/1.2 "Outfit", "Inter", sans-serif; letter-spacing: .18em; text-transform: uppercase; margin: 0 0 10px; }
  .label { color: var(--denim); font: 700 8pt/1.2 "Outfit", "Inter", sans-serif; letter-spacing: .16em; text-transform: uppercase; display: block; margin-bottom: 0.08in; }
  .gold-rule { width: 2.4in; height: 3px; background: linear-gradient(90deg, var(--gold), transparent); margin: 0.22in 0 0.28in; }

  .document { width: max-content; margin: 28px auto 56px; }
  .pdf-page { position: relative; width: var(--page-w); height: var(--page-h); margin: 0 auto 24px; overflow: hidden; background: var(--paper); box-shadow: 0 14px 36px rgba(10,22,37,.15); break-after: page; page-break-after: always; }
  .pdf-page.has-bloom::before {
    content: ""; position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(circle at 8% 92%, rgba(127,80,29,.16) 0%, rgba(159,118,51,.13) 14%, rgba(201,161,73,.11) 28%, rgba(85,110,145,.07) 43%, transparent 62%);
  }
  .pdf-page-content { position: absolute; inset: var(--safe-y) var(--safe-x) 0.68in; overflow: hidden; display: flex; flex-direction: column;}
  .pdf-page-footer { position: absolute; left: var(--safe-x); right: var(--safe-x); bottom: 0.24in; display: flex; justify-content: space-between; align-items: center; padding-top: 0.09in; border-top: 1px solid var(--line); color: var(--haze); font-size: 9pt; }

  /* Variant Specific Styles */
  ${className === 'v1' ? `
    .v1-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.18in; flex: 1; min-height:0; }
    .v1-col { display: flex; flex-direction: column; gap: 0.18in; }
    .v1-card { padding: 0.15in; border: 1px solid var(--line); border-radius: 12px; background: var(--canvas); }
    .v1-card h4 { font-size: 13pt; margin-bottom: 0.08in; color: var(--denim);}
    .v1-card p { font-size: 9pt; line-height: 1.4; margin: 0 0 0.08in; }
    .v1-card .trap-box { border-top: 1px solid var(--gold); padding-top: 0.08in; margin-top: 0.08in; background: var(--soft-white); padding:0.1in; border-radius: 6px;}
    .v1-card .trap-box .label { color: var(--petal); margin-bottom: 0.04in; }
  ` : className === 'v2' ? `
    .v2-band { display: flex; border-bottom: 1px solid var(--line); padding: 0.15in 0; gap: 0.2in; align-items: flex-start;}
    .v2-band:last-child { border-bottom: none; }
    .v2-title { width: 1.8in; flex-shrink: 0; }
    .v2-title h4 { font-size: 14pt; color: var(--deep-ink); }
    .v2-content { display: grid; grid-template-columns: 1fr 1fr 1.2fr; gap: 0.15in; flex: 1; }
    .v2-col p { font-size: 8.5pt; line-height: 1.45; margin: 0; }
    .v2-col .label { margin-bottom: 0.05in; }
    .v2-trap { background: var(--soft-white); border-left: 3px solid var(--petal); padding: 0.08in 0.1in; }
  ` : `
    .v3-table { width: 100%; border-collapse: collapse; font-size: 8.5pt; table-layout: fixed;}
    .v3-table th { text-align: left; padding: 0.08in 0.1in; background: var(--denim); color: white; font: 700 8pt/1.2 "Outfit", sans-serif; letter-spacing: .1em; text-transform: uppercase; border-right:1px solid rgba(255,255,255,0.2);}
    .v3-table td { padding: 0.1in; border-bottom: 1px solid var(--line); vertical-align: top; line-height: 1.4; }
    .v3-table tr:nth-child(even) td { background: var(--canvas); }
    .v3-table td h4 { font-size: 11pt; margin-bottom: 0.05in; color:var(--deep-ink);}
    .v3-trap { color: var(--petal); font-weight: 500; }
    .v3-trap-label { display: block; font: 700 7pt/1.2 "Outfit", sans-serif; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 2px; }
  `}

  @page { size: 10in 8in; margin: 0; }
  @media print {
    html, body { background: #fff !important; }
    .pdf-page { box-shadow: none; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
<main class="document">
${content}
</main>
</body>
</html>`;

function renderVariant1() {
  let content = '';
  let pageNum = 1;
  data.forEach(family => {
    // 3 cards per column, max 3 columns (9 per page)
    // We'll just do 3 cards per page for a spacious V1 look, or chunk them
    const chunks = [];
    for(let i=0; i<family.types.length; i+=3) {
      chunks.push(family.types.slice(i, i+3));
    }

    chunks.forEach((chunk, index) => {
      let gridHTML = '<div class="v1-grid">';
      chunk.forEach(type => {
        gridHTML += `
          <div class="v1-col">
            <article class="v1-card">
              <span class="label">Question Type</span>
              <h4>${type.name}</h4>
              <p><strong>Task:</strong> ${type.task}</p>
              <p><strong>Stem:</strong> <em>"${type.stems[0]}"</em></p>
              <p><strong>Method:</strong> ${type.method}</p>
              <div class="trap-box">
                <span class="label">The #1 Trap</span>
                <p>${type.trap}</p>
              </div>
            </article>
          </div>
        `;
      });
      gridHTML += '</div>';

      content += `
        <section class="pdf-page ${index === 0 ? 'has-bloom' : ''}">
          <div class="pdf-page-content">
            <p class="eyebrow">Level 3A — Trap Map (Variant 1) · Family ${family.family}</p>
            <h1>${family.family}</h1>
            <div class="gold-rule"></div>
            ${gridHTML}
          </div>
          <footer class="pdf-page-footer">
            <span>Sunlit Botanical Editorial · V1 Column Cards</span>
            <span>${pageNum++}</span>
          </footer>
        </section>
      `;
    });
  });
  return HTML_SCAFFOLD('V1', content, 'v1');
}

function renderVariant2() {
  let content = '';
  let pageNum = 1;
  data.forEach(family => {
    // Fit up to 3 bands per page
    const chunks = [];
    for(let i=0; i<family.types.length; i+=3) {
      chunks.push(family.types.slice(i, i+3));
    }

    chunks.forEach((chunk, index) => {
       let bandsHTML = '<div style="flex:1; display:flex; flex-direction:column; gap:0.1in; justify-content:center;">';
       chunk.forEach(type => {
         bandsHTML += `
           <div class="v2-band">
             <div class="v2-title">
               <h4>${type.name}</h4>
             </div>
             <div class="v2-content">
               <div class="v2-col">
                 <span class="label">Task & Stem</span>
                 <p>${type.task}</p>
                 <p style="margin-top:0.05in; color:var(--haze);"><em>"${type.stems[0]}"</em></p>
               </div>
               <div class="v2-col">
                 <span class="label">Method</span>
                 <p>${type.method}</p>
               </div>
               <div class="v2-col v2-trap">
                 <span class="label" style="color:var(--petal);">The #1 Trap</span>
                 <p>${type.trap}</p>
               </div>
             </div>
           </div>
         `;
       });
       bandsHTML += '</div>';

       content += `
        <section class="pdf-page">
          <div class="pdf-page-content">
            <div style="display:flex; justify-content:space-between; align-items:flex-end;">
              <div>
                <p class="eyebrow">Level 3A — Trap Map (Variant 2)</p>
                <h2 style="font-size: 24pt;">${family.family}</h2>
              </div>
            </div>
            <div class="gold-rule" style="width:100%; height:2px;"></div>
            ${bandsHTML}
          </div>
          <footer class="pdf-page-footer">
            <span>Sunlit Botanical Editorial · V2 Process Bands</span>
            <span>${pageNum++}</span>
          </footer>
        </section>
      `;
    });
  });
  return HTML_SCAFFOLD('V2', content, 'v2');
}

function renderVariant3() {
  let content = '';
  let pageNum = 1;
  // Fit up to 4 rows per page in a dense matrix
  const allTypes = data.flatMap(f => f.types.map(t => ({...t, family: f.family})));

  for(let i=0; i<allTypes.length; i+=4) {
    const chunk = allTypes.slice(i, i+4);
    let tableRows = '';
    chunk.forEach(type => {
      tableRows += `
        <tr>
          <td>
            <span class="eyebrow" style="font-size:7pt; margin-bottom:2px; color:var(--haze);">${type.family}</span>
            <h4>${type.name}</h4>
          </td>
          <td>${type.task}<br/><span style="color:var(--haze); font-style:italic; display:inline-block; margin-top:4px;">"${type.stems[0]}"</span></td>
          <td>${type.method}</td>
          <td class="v3-trap">
             <span class="v3-trap-label">The #1 Trap</span>
             ${type.trap}
          </td>
        </tr>
      `;
    });

    content += `
      <section class="pdf-page ${i===0?'has-bloom':''}">
        <div class="pdf-page-content">
          <p class="eyebrow">Level 3A — Trap Map (Variant 3) · Matrix Reference</p>
          <div style="flex:1; margin-top:0.2in;">
            <table class="v3-table">
              <thead>
                <tr>
                  <th style="width: 20%;">Type</th>
                  <th style="width: 25%;">Task & Stem</th>
                  <th style="width: 30%;">Method</th>
                  <th style="width: 25%;">Trap</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
          </div>
        </div>
        <footer class="pdf-page-footer">
          <span>Sunlit Botanical Editorial · V3 Dense Matrix</span>
          <span>${pageNum++}</span>
        </footer>
      </section>
    `;
  }
  return HTML_SCAFFOLD('V3', content, 'v3');
}

fs.writeFileSync('variant-1.html', renderVariant1());
fs.writeFileSync('variant-2.html', renderVariant2());
fs.writeFileSync('variant-3.html', renderVariant3());
console.log('HTML variants generated.');
