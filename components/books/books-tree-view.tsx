"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, BookOpen, FolderOpen, Book } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { BookTreePublication } from "@/lib/types/book";

interface TreeViewProps {
  data: BookTreePublication[];
}

export function BooksTreeView({ data }: TreeViewProps) {
  const [expandedPublications, setExpandedPublications] = useState<Set<string>>(new Set());
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());

  const togglePublication = (id: string) => {
    setExpandedPublications((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSubject = (id: string) => {
    setExpandedSubjects((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">No books found in tree structure</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((publication) => (
        <Card key={publication.publication.id} className="overflow-hidden">
          {/* Publication Header */}
          <div className="flex items-center gap-2 border-b border-border/60 bg-muted/30 px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => togglePublication(publication.publication.id)}
            >
              {expandedPublications.has(publication.publication.id) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
            <FolderOpen className="h-5 w-5 text-primary" />
            <span className="font-medium">{publication.publication.name}</span>
            <Badge variant={publication.publication.isActive ? "default" : "secondary"}>
              {publication.publication.isActive ? "Active" : "Inactive"}
            </Badge>
            <span className="text-sm text-muted-foreground">
              ({publication.subjects.length} subjects)
            </span>
          </div>

          {/* Subjects and Books */}
          {expandedPublications.has(publication.publication.id) && (
            <div className="px-4 py-2">
              {publication.subjects.map((subject) => (
                <div key={subject.subject.id} className="mt-2">
                  {/* Subject Header */}
                  <div className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-muted/20">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => toggleSubject(subject.subject.id)}
                    >
                      {expandedSubjects.has(subject.subject.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{subject.subject.name}</span>
                    <Badge variant={subject.subject.isActive ? "default" : "secondary"} className="text-xs">
                      {subject.subject.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      ({subject.books.length} books)
                    </span>
                  </div>

                  {/* Books List */}
                  {expandedSubjects.has(subject.subject.id) && (
                    <div className="ml-8 mt-1 space-y-1">
                      {subject.books.map((book) => (
                        <div
                          key={book.id}
                          className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-muted/20"
                        >
                          <Book className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{book.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {book.priceRange?.display || "-"}
                          </span>
                        </div>
                      ))}
                      {subject.books.length === 0 && (
                        <p className="ml-6 text-sm text-muted-foreground">
                          No books in this subject
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {publication.subjects.length === 0 && (
                <p className="ml-6 text-sm text-muted-foreground">
                  No subjects in this publication
                </p>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
