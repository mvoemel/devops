# LaTeX Example Snippets

## Chapter and Sections

```latex
\chapter{Level 1}
\section{Level 2}
\subsection{Level 3}
\subsubsection{Level 4}
```

## Text

```latex
\textbf{Bold}
\textit{Italic}
\texttt{Monospace}
\underline{Underline}
```

## Citations and References

```latex
\cite{author2024title}
\ref{fig:example_figure}
\href{https://example.com/}{example.com}
\footnote{This is a footnote.}
```

## Math

```latex
% Inline
$x^2 + y^2 = z^2$

% Greek letters
$\alpha$, $\beta$, $\gamma$, $\delta$

% Subscript / Superscript
$A_{ij}$, $x^{n}$

% Fractions
$\frac{N}{2}$

% Sets
$T \in \mathbb{R}^{m \times d}$

% Named attention
$\text{Attention}_{A \to B}$

% Calligraphic
$\mathcal{G} = (\mathcal{V}, \mathcal{E})$

% Block equation
\begin{equation}
    \hat{y} = \sigma\!\left(\mathbf{W}\mathbf{x} + \mathbf{b}\right)
    \label{eq:example}
\end{equation}
```

## Lists

### Enumerate

```latex
\begin{enumerate}
    \item \textbf{First Item:} Description of the first point goes here.
    \item \textbf{Second Item:} Description of the second point goes here.
    \item \textbf{Third Item:} Description of the third point goes here.
\end{enumerate}
```

### Itemize

```latex
\begin{itemize}
    \item \textbf{First Item:} Description of the first bullet point.
    \item \textbf{Second Item:} Description of the second bullet point \cite{author2024title}.
    \item \textbf{Third Item:} Description of the third bullet point.
\end{itemize}
```

## Figures

### Single Figure

```latex
\begin{figure}[h]
    \centering
    \includegraphics[width=0.8\textwidth]{figures/example.png}
    \caption{Caption describing the figure.}
    \label{fig:example}
\end{figure}
```

### Figures Stacked Vertically

```latex
\begin{figure}[h]
    \centering
    \begin{subfigure}{1\textwidth}
        \centering
        \includegraphics[width=1\textwidth]{figures/example_top.png}
        \caption{Caption for the top figure.}
        \label{fig:example_top}
    \end{subfigure}
    \begin{subfigure}{1\textwidth}
        \centering
        \includegraphics[width=\textwidth]{figures/example_bottom.png}
        \caption{Caption for the bottom figure.}
        \label{fig:example_bottom}
    \end{subfigure}
    \caption{Overall caption for both figures.}
    \label{fig:example_stacked}
\end{figure}
```

### Figures Side by Side

```latex
\begin{figure}[htbp]
    \centering
    \begin{subfigure}{0.45\textwidth}
        \centering
        \includegraphics[width=\textwidth]{figures/example_left.png}
        \caption{Caption for the left figure.}
        \label{fig:example_left}
    \end{subfigure}
    \hfill
    \begin{subfigure}{0.45\textwidth}
        \centering
        \includegraphics[width=\textwidth]{figures/example_right.png}
        \caption{Caption for the right figure.}
        \label{fig:example_right}
    \end{subfigure}
    \caption{Overall caption for both figures.}
    \label{fig:example_side}
\end{figure}
```

## Tables

### Simple Table

```latex
\begin{table}[h]
    \centering
    \begin{tabular}{lcc}
        \toprule
        \textbf{Model} & \textbf{Accuracy} & \textbf{F1 Score} \\
        \midrule
        Baseline       & 0.81              & 0.79              \\
        Model A        & 0.85              & 0.83              \\
        Model B        & 0.88              & 0.87              \\
        \bottomrule
    \end{tabular}
    \caption{Comparison of model performance metrics.}
    \label{table:example}
\end{table}
```

### Sideways Table (from CSV)

```latex
\begin{sidewaystable}
    \centering
    \csvreader[
        tabular=l*{4}{r},
        table head=\toprule
            \bfseries Model &
            \bfseries Metric A &
            \bfseries Metric B &
            \bfseries Metric C &
            \bfseries Metric D \\ \midrule,
        late after line=\\,
        table foot=\bottomrule
    ]{tables/example.csv}{
        Model=\model,
        Metric A=\ma,
        Metric B=\mb,
        Metric C=\mc,
        Metric D=\md
    }{\model & \ma & \mb & \mc & \md}
    \caption{Performance metrics table loaded from CSV.}
    \label{table:example_sideways}
\end{sidewaystable}
```

## List of Abbreviations

```latex
\chapter*{List of Abbreviations}
\noindent
\begin{tblr}{
    colspec = {Q[l, wd=4cm] X[l]},
    row{1} = {font=\bfseries},
    hline{1,2} = {solid},
}
Abbreviation & Full Word \\
ML           & Machine Learning \\
NN           & Neural Network \\
NLP          & Natural Language Processing \\
\end{tblr}
```

## Directory Tree

```latex
\dirtree{%
    .1 /project-root.
    .2 /src \DTcomment{Source code}.
    .3 /models \DTcomment{Model definitions}.
    .3 /utils \DTcomment{Utility functions}.
    .2 /data \DTcomment{Datasets and preprocessing scripts}.
    .2 /experiments \DTcomment{Training configs and results}.
    .2 /docs \DTcomment{Documentation}.
}
```

## Code Listings

```latex
\begin{lstlisting}[language=Python, caption={Example Python snippet.}, label={lst:example}]
def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("World"))
\end{lstlisting}
```

## Algorithms

```latex
\begin{algorithm}
\caption{Example Algorithm}
\label{alg:example}
\begin{algorithmic}[1]
    \Require Input $X$, threshold $\tau$
    \Ensure Output $Y$
    \State Initialize $Y \gets \emptyset$
    \For{each $x \in X$}
        \If{$x > \tau$}
            \State $Y \gets Y \cup \{x\}$
        \EndIf
    \EndFor
    \Return $Y$
\end{algorithmic}
\end{algorithm}
```
